import { loginHandler } from "@storyofams/next-password-protect";

export default loginHandler(process.env.NEXT_SITE_PASSWORD, {});
