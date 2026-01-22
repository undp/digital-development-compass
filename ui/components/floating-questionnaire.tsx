import { Popover, Transition } from "@headlessui/react";
import { prefix } from "lib/prefix";
import { Fragment, useEffect, useMemo, useState } from "react";
import { FiChevronLeft } from "react-icons/fi";

export interface FloatingQuestion {
  id: string;
  label: string;
  placeholder?: string;
  optional?: boolean;
  defaultValue?: string;
  helperText?: string;
  type?: "text" | "info" | "scale10" | "email";
}

const ENDPOINT = process.env.FEEDBACK_ENDPOINT || "";

interface AnswerState {
  [key: string]: string;
}

const defaultQuestions: FloatingQuestion[] = [
  {
    id: "intro",
    type: "info",
    label:
      "UNDP is constantly improving the Digital Development Compass and would like your help.",
    optional: true,
  },
  {
    id: "concerns",
    label:
      "Do you have any questions or concerns you would like to share with us?",
    placeholder: "Type your answer here...",
  },
  {
    id: "dataset",
    label: "Is there a digital development data set we should add?",
    placeholder: "Type your answer here...",
    helperText:
      "Please share the link and why we should add it to our analysis.",
    optional: true,
  },
  {
    id: "contact",
    type: "email",
    label:
      "If you would like us to reach out to you about these concerns, please share your contact information.",
    placeholder: "name@email.com",
    optional: true,
  },
  {
    id: "nps",
    label: "How likely are you to recommend us to a friend or colleague?",
    type: "scale10",
    optional: false,
    helperText: "0 — Not likely at all; 10 — Extremely likely",
  },
];

export default function FloatingQuestionnaire() {
  const questions = defaultQuestions;
  const buttonLabel = "Feedback";

  const initialAnswers = useMemo(() => {
    const base: AnswerState = {};
    questions.forEach((question) => {
      base[question.id] = question.defaultValue || "";
    });
    return base;
  }, [questions]);

  const [answers, setAnswers] = useState<AnswerState>(initialAnswers);
  const [activeStep, setActiveStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState(
    "https://digitaldevelopmentcompass.undp.org/",
  );

  useEffect(() => {
    setAnswers(initialAnswers);
    setActiveStep(0);
    setSubmitted(false);
    setError(null);
  }, [initialAnswers]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location?.origin) {
      console.log("url", `${window.location.origin}${prefix}`);

      setShareUrl(`${window.location.origin}${prefix}`);
    }
  }, []);

  const currentQuestion = questions[activeStep];
  const isLastStep = activeStep === questions.length - 1;

  const handleAnswerChange = (value: string) => {
    if (!currentQuestion) return;
    setError(null);
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const handleNext = () => {
    if (!currentQuestion) return;
    if (
      currentQuestion.type !== "info" &&
      !currentQuestion.optional &&
      !answers[currentQuestion.id]?.trim()
    ) {
      setError("Please enter an answer before continuing.");
      return;
    }
    if (
      currentQuestion.type === "email" &&
      answers[currentQuestion.id]?.trim() &&
      !validateEmail(answers[currentQuestion.id])
    ) {
      setError("Please enter a valid email address.");
      return;
    }

    setActiveStep((prev) => Math.min(prev + 1, questions.length - 1));
  };

  const handlePrevious = () => {
    setError(null);
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentQuestion) return;
    if (
      currentQuestion.type !== "info" &&
      !currentQuestion.optional &&
      !answers[currentQuestion.id]?.trim()
    ) {
      setError(
        currentQuestion.type === "scale10"
          ? "Please select an answer before submitting."
          : "Please enter an answer before submitting.",
      );
      return;
    }
    if (
      currentQuestion.type === "email" &&
      answers[currentQuestion.id]?.trim() &&
      !validateEmail(answers[currentQuestion.id])
    ) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...answers,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to submit right now.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const restart = () => {
    setAnswers(initialAnswers);
    setActiveStep(0);
    setSubmitted(false);
    setError(null);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const renderForm = () => {
    if (!currentQuestion) return null;

    const renderInput = () => {
      if (currentQuestion.type === "info") {
        return null;
      }

      if (currentQuestion.type === "scale10") {
        return (
          <div
            className="flex flex-wrap gap-2 justify-center"
            role="group"
            aria-label="Scale 0 to 10"
          >
            {Array.from({ length: 11 }, (_, idx) => `${idx}`).map((value) => {
              const selected = answers[currentQuestion.id] === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleAnswerChange(value)}
                  className={`h-10 w-10 rounded-md border text-sm font-semibold transition shadow-sm ${
                    selected
                      ? "bg-brand-blue-dark text-white border-brand-blue-dark"
                      : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50"
                  }`}
                  aria-pressed={selected}
                >
                  {value}
                </button>
              );
            })}
          </div>
        );
      }

      return (
        <>
          {currentQuestion.type === "email" ? (
            <input
              type="email"
              value={answers[currentQuestion.id]}
              onChange={(event) => handleAnswerChange(event.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 shadow-sm text-base p-3 placeholder:text-gray-400 placeholder:text-base"
              placeholder={currentQuestion.placeholder}
            />
          ) : (
            <div>
              <textarea
                value={answers[currentQuestion.id]}
                onChange={(event) => handleAnswerChange(event.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 shadow-sm text-base p-3 placeholder:text-gray-400"
                rows={4}
                placeholder={currentQuestion.placeholder}
                maxLength={200}
              />
              <p className="text-xs text-gray-500 mt-1 text-right">
                {answers[currentQuestion.id]?.length || 0}/200
              </p>
            </div>
          )}
        </>
      );
    };

    return (
      <div className="flex flex-col h-full min-h-[200px]">
        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between">
            {/* <Dialog.Title className="text-base font-semibold text-gray-900">
              {title}
            </Dialog.Title> */}
            {/* <span className="text-xs text-gray-500">
              Step {activeStep + 1} of {questions.length}
            </span> */}
          </div>
          <div>
            <p
              className={`text-lg md:text-xl font-semibold text-gray-900 leading-snug ${currentQuestion.type === "info" ? "text-center" : ""}`}
            >
              {currentQuestion.label}
            </p>
            {currentQuestion.helperText && (
              <p className="text-sm text-gray-600 mt-1">
                {currentQuestion.helperText}
              </p>
            )}
          </div>
          {renderInput()}
          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 mt-auto">
          <div className="flex items-center space-x-2">
            {activeStep > 0 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="inline-flex items-center space-x-2 rounded-md border border-brand-blue-dark px-3 py-3 text-base font-semibold text-brand-blue-dark bg-white shadow-sm hover:bg-brand-blue/10"
              >
                <FiChevronLeft className="h-5 w-5" />
              </button>
            )}
          </div>
          <div className="space-x-2">
            {!isLastStep && (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center justify-center rounded-md bg-brand-blue-dark px-6 py-3 text-base font-semibold text-white shadow-md hover:bg-brand-blue"
              >
                Continue
              </button>
            )}
            {isLastStep && (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="inline-flex items-center justify-center rounded-md bg-brand-blue-dark px-6 py-3 text-base font-semibold text-white shadow-md hover:bg-brand-blue disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderSuccess = () => {
    return (
      <div className="space-y-4">
        <div className="space-y-3">
          <p className="text-lg font-semibold text-gray-900 text-center">
            Thank you so much for your feedback
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            <a
              aria-label="Share on Facebook"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border bg-white shadow-sm hover:bg-gray-50 "
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                shareUrl,
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={`${prefix}/social/facebook.svg`}
                alt="Facebook"
                className="h-11 w-11"
              />
            </a>
            <a
              aria-label="Share on X"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border bg-white shadow-sm hover:bg-gray-50 "
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                shareUrl,
              )}&text=${encodeURIComponent(
                "Check out the Digital Development Compass",
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={`${prefix}/social/x.svg`}
                alt="X"
                className="h-11 w-11"
              />
            </a>
            <a
              aria-label="Share on LinkedIn"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border bg-white shadow-sm hover:bg-gray-50  "
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                shareUrl,
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={`${prefix}/social/linkedin.svg`}
                alt="LinkedIn"
                className="h-11 w-11"
              />
            </a>
          </div>
          <div className="pt-4">
            <a
              href="https://www.undp.org/digital"
              target="_blank"
              rel="noreferrer"
              className="block w-full text-center rounded-full bg-brand-blue-dark px-6 py-3 text-base font-semibold text-white shadow-md "
            >
              Visit UNDP.org
            </a>
          </div>
        </div>
      </div>
    );
  };

  const progressPercentage = ((activeStep + 1) / questions.length) * 100;

  return (
    <div className="fixed right-6 bottom-6 z-50">
      <Popover>
        {({ open }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.15)] hover:cursor-pointer border   transition-all w-[54px] h-[54px] ${
                open
                  ? "bg-brand-blue-dark hover:bg-brand-blue border-brand-blue"
                  : "bg-white hover:bg-gray-100 border-gray-100"
              }`}
              aria-label={open ? "Close" : buttonLabel}
            >
              {open ? (
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <img
                  src={`${prefix}/undp-logo.svg`}
                  alt=""
                  width={18}
                  className="hidden sm:inline"
                />
              )}
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 translate-y-4"
              enterTo="opacity-100 translate-y-0"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-4"
              afterLeave={restart}
            >
              <Popover.Panel className="absolute bottom-16 right-0 w-[360px] min-h-[150px] rounded-lg bg-white p-1 shadow-2xl ring-1 ring-black/5">
                {/* Progress bar */}
                <div className="mb-1 px-2">
                  <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-blue-dark transition-all duration-300 ease-out"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
                <div className="p-4">
                  {!submitted ? renderForm() : renderSuccess()}
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
