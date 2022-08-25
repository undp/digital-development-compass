import Image from 'next/image';
import React, { useState } from 'react';

export interface LoginComponentProps {
  apiUrl?: string;
}

export const LoginComponent = ({
  apiUrl,
}: LoginComponentProps) => {
  const [isBusy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (isBusy) {
      return;
    }

    setBusy(true);
    setError('');

    try {
      const form = document.querySelector(
        '#password-form form',
      ) as HTMLFormElement;

      const formData = new FormData(form);
      console.log(formData)

      const res = await fetch(apiUrl || `/api/login`, {
        method: 'post',
        credentials: 'include',
        body: JSON.stringify({ password: formData.get('password') }),
        headers: { 'Content-Type': 'application/json' },
      });

      const { message } = await res.json();

      if (res.status === 200) {
        window.location.reload();
      } else {
        setError(message);
        setBusy(false);
      }
    } catch (e) {
      setError('An error has occured.');
      setBusy(false);
    }

    return false;
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100"
    >``
      <div className="flex flex-col items-center max-w-[32em]">
        <div className="p-10 bg-white">
          <a className="block w-[203px] mt-[-60px]">
            <Image
              src="/undp-logo.svg"
              height={49.27}
              width={100}
              layout="responsive"
              alt="UNDP Logo"
            />
          </a>

          <h1 className="font-semibold text-2xl py-3">
            Digital Development Compass
          </h1>

          <p>
            Currently the Digital Development Compass is in closed Beta. Please sign up for updates to learn about the launch or reach out to <a className="underline" href="mailto:digital@undp.org">digital@undp.org</a> with any inquires.
          </p>


          <div id="mc_embed_signup">
            <form action="https://undp.us7.list-manage.com/subscribe/post?u=148ee4035f554a53ad2545a67&amp;id=232e454b96" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
              <div id="mc_embed_signup_scroll" className="space-y-2 mt-6">
                <h2 className="font-semibold text-2xl">Join Us For Updates &amp; Launch Event Invitation</h2>
                <div className="mc-field-group">
                  <label htmlFor="mce-EMAIL">Email Address<span className="text-red-500">*</span>
                  </label>
                  <input type="email" name="EMAIL" className={`border py-2 px-3 w-full`} id="mce-EMAIL" />
                </div>
                <div className="mc-field-group">
                  <label htmlFor="mce-COUNTRY">Country </label>
                  <input type="text" name="COUNTRY" className={`border py-2 px-3 w-full`} id="mce-COUNTRY" />
                </div>
                <div hidden><input type="hidden" name="tags" value="6730541" /></div>
                <div id="mce-responses" className="clear" >
                  <div className="response hidden" id="mce-error-response"></div>
                  <div className="response hidden" id="mce-success-response"></div>
                </div>
                {/* <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups--> */}
                <div className="absolute left-[-5000px]" aria-hidden="true"><input type="text" name="b_148ee4035f554a53ad2545a67_232e454b96" tabIndex={-1} /></div>
                <div className="clear"><input className="bg-[#0063AC] hover:bg-blue-700 text-white font-bold mt-3 py-3 px-4 rounded-full w-full" type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" /></div>
              </div>
            </form>
          </div>

        </div>


        <div className="px-10 w-full"
          id="password-form">
          <form
            data-testid="form"
            onSubmit={onSubmit}
            className="my-8 w-full flex flex-col"
          >
            <input
              name="password"
              type="password"
              id="password"
              placeholder="Enter password..."
              required
              className={`border py-2 px-3 ${error ? "border-red-500" : ""}`}
            />
            {!!error && (
              <div className="text-red-500" data-testid="error">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isBusy}
              className="bg-[#0A0A0A] hover:bg-blue-700 text-white font-bold mt-3 py-3 px-4 rounded-full"
            >
              {isBusy ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>


        {/* <div
          className="mt-10"
          dangerouslySetInnerHTML={{
            __html: `<!-- Begin Mailchimp Signup Form -->
<link href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css" rel="stylesheet" type="text/css">
<style type="text/css">
	#mc_embed_signup{width:100%;}
</style>
<div id="mc_embed_signup">
<form action="https://undp.us7.list-manage.com/subscribe/post?u=148ee4035f554a53ad2545a67&amp;id=232e454b96" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
    <div id="mc_embed_signup_scroll">
	<h2>Join Us For Updates &amp; Launch Event Invitation</h2>
<div class="indicates-required"><span class="asterisk">*</span> indicates required</div>
<div class="mc-field-group">
	<label for="mce-EMAIL">Email Address  <span class="asterisk">*</span>
</label>
	<input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL">
</div>
<div class="mc-field-group">
	<label for="mce-COUNTRY">Country </label>
	<input type="text" value="" name="COUNTRY" class="" id="mce-COUNTRY">
</div>
<div hidden="true"><input type="hidden" name="tags" value="6730541"></div>
	<div id="mce-responses" class="clear">
		<div class="response" id="mce-error-response" style="display:none"></div>
		<div class="response" id="mce-success-response" style="display:none"></div>
	</div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
    <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_148ee4035f554a53ad2545a67_232e454b96" tabindex="-1" value=""></div>
    <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
    </div>
</form>
</div>
<script type='text/javascript' src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'></script><script type='text/javascript'>(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='ADDRESS';ftypes[3]='address';fnames[4]='PHONE';ftypes[4]='phone';fnames[5]='BIRTHDAY';ftypes[5]='birthday';fnames[6]='TITLE';ftypes[6]='text';fnames[7]='UNIT';ftypes[7]='text';fnames[8]='COUNTRY';ftypes[8]='text';}(jQuery));var $mcj = jQuery.noConflict(true);</script>
<!--End mc_embed_signup-->` }} />

      </div> */}
      </div>
    </div>
  );
};