import Image from "next/image";
import React, { useState } from "react";
import UNDPLogo from "../public/undp-logo.svg";

export interface LoginComponentProps {
  apiUrl?: string;
}

export const LoginComponent = ({ apiUrl }: LoginComponentProps) => {
  const [isBusy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (isBusy) {
      return;
    }

    setBusy(true);
    setError("");

    try {
      const form = document.querySelector(
        "#password-form form"
      ) as HTMLFormElement;

      const formData = new FormData(form);

      const res = await fetch(apiUrl || `/api/login`, {
        method: "post",
        credentials: "include",
        body: JSON.stringify({ password: formData.get("password") }),
        headers: { "Content-Type": "application/json" },
      });

      const { message } = await res.json();

      if (res.status === 200) {
        window.location.reload();
      } else {
        setError(message);
        setBusy(false);
      }
    } catch (e) {
      setError("An error has occured.");
      setBusy(false);
    }

    return false;
  };

  return (
    <>
      <style>{`body {background: #f1f5f9;}`}</style>
      <div className="lg:h-screen flex flex-col lg:flex-row bg-gradient-to-bl from-brand-blue to-brand-blue-dark lg:overflow-hidden">
        <div className="order-0 lg:order-1 flex-1 flex flex-col items-center justify-center px-10 py-8 lg:py-0">
          <div className="w-full lg:max-w-sm" id="password-form">
            <form
              data-testid="form"
              onSubmit={onSubmit}
              className="w-full flex flex-col space-y-4"
            >
              <input
                name="password"
                type="password"
                id="password"
                placeholder="Enter password"
                required
                className={`rounded border border-transparent shadow-lg py-2 px-3 ${
                  error
                    ? "ring ring-red-400 ring-opacity-50 border-red-600"
                    : ""
                }`}
              />
              {!!error && (
                <div
                  className="text-red-500 bg-red-100 px-2 py-1 text-sm rounded"
                  data-testid="error"
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isBusy}
                className="font-semibold w-full text-sm py-3 uppercase tracking-wide bg-gray-900 text-white"
              >
                {isBusy ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
        <div className="lg:w-1/2 flex-shrink-0 bg-white shadow-xl divide-y overflow-auto">
          <div className="p-4 lg:p-8">
            <div className="block w-16 mx-auto">
              <Image src={UNDPLogo} alt="UNDP Logo" />
            </div>

            <div className="flex items-center justify-center space-x-2 mt-2 mx-auto">
              <h1 className="font-medium text-2xl text-center">
                Digital Development Compass
              </h1>
              <span className="inline-flex items-center px-[10px] py-[2px] rounded-full font-semibold bg-blue-100 text-blue-800 uppercase text-[10px] lg:text-xs tracking-widest">
                Beta
              </span>
            </div>

            <p className="text-gray-600 text-left mt-4">
              The Digital Development Compass is a new tool that aggregates
              publicly available data on countries’ digital development in one
              place. Now in its beta phase, it uses UNDP's whole-of-society
              approach and country experience to assess countries' efforts in
              inclusive digital transformation. It also identifies gaps, and
              recommends improvements to make this transformation easier and
              faster. Please subscribe to receive updates or reach out to{" "}
              <a className="underline" href="mailto:digital@undp.org">
                digital@undp.org
              </a>{" "}
              with any inquires.
            </p>
          </div>

          <div className="p-4 lg:p-8" id="mc_embed_signup">
            <form
              action="https://undp.us7.list-manage.com/subscribe/post?u=148ee4035f554a53ad2545a67&amp;id=232e454b96"
              method="post"
              id="mc-embedded-subscribe-form"
              name="mc-embedded-subscribe-form"
              className="validate"
              target="_blank"
              noValidate
            >
              <div id="mc_embed_signup_scroll" className="space-y-2 mt-6">
                <h2 className="font-semibold text-2xl">
                  Join Us For Updates &amp; A Launch Event Invitation
                </h2>
                <div className="mc-field-group">
                  <label htmlFor="mce-EMAIL">
                    Email Address<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="EMAIL"
                    className={`border py-2 px-3 w-full`}
                    id="mce-EMAIL"
                  />
                </div>
                <div className="mc-field-group">
                  <label htmlFor="mce-COUNTRY">Country </label>
                  <input
                    type="text"
                    name="COUNTRY"
                    className={`border py-2 px-3 w-full`}
                    id="mce-COUNTRY"
                  />
                </div>
                <div hidden>
                  <input type="hidden" name="tags" value="6730541" />
                </div>
                <div id="mce-responses" className="clear">
                  <div
                    className="response hidden"
                    id="mce-error-response"
                  ></div>
                  <div
                    className="response hidden"
                    id="mce-success-response"
                  ></div>
                </div>
                {/* <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups--> */}
                <div className="absolute left-[-5000px]" aria-hidden="true">
                  <input
                    type="text"
                    name="b_148ee4035f554a53ad2545a67_232e454b96"
                    tabIndex={-1}
                  />
                </div>
                <div className="clear">
                  <input
                    className="bg-brand-blue-dark hover:bg-brand-blue text-white mt-3 font-semibold w-full text-sm py-3 uppercase tracking-wide"
                    type="submit"
                    value="Subscribe"
                    name="subscribe"
                    id="mc-embedded-subscribe"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
