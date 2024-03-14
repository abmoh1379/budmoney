import expeseManagerSvg from "../resources/landingPage/svgs/aboutSvg.svg";
import unlimitedAccessSvg from "../resources/landingPage/svgs/discoverSvg.svg";
import teamSvg from "../resources/landingPage/svgs/signUpSvg.svg";

const landingInfo = [
  {
    subtitle: "expense manager",
    title: "Unlimited expense management with zero fees.",
    paragraph:
      "Get access to our exclusive app that allows you to manage and view your expenses without getting charged any fees.",
    linkText: "Get started",
    linkTo: "/sign-up",
    btnBackGroundColor: "black",
    sectionBackGround: "white",
    image: expeseManagerSvg,
    imgAlt: "Unlimited expense management with zero fees",
    imgTitle: "Unlimited expense management with zero fees",
    imgWidth: "740.67538",
    imgHeight: "597.17519",
    scrollId : 'about'
  },

  {
    subtitle: "Unlimited Access",
    title: "Login to your expense manager at any time",
    paragraph:
      "We have you covered no matter where you are located. All you need is an internet connection and a phone or computer.",
    linkText: "Learn more",
    linkTo: "/login",
    btnBackGroundColor: "white",
    sectionBackGround: "black",
    image: unlimitedAccessSvg,
    imgAlt: "Login to your expense manager at any time",
    imgTitle: "Login to your expense manager at any time",
    imgWidth: "869.99994",
    imgHeight: "520.13854",
    scrollId : 'discover'
  },

  {
    subtitle: "You are our team",
    title: "Creating an expense manager account is extremely easy",
    paragraph:
      "Get everything set up and ready in under 1 minute. You can create an account using gmail and password or automatic google sign up with no password.",
    linkText: "Start now",
    linkTo: "/sign-up",
    btnBackGroundColor: "black",
    sectionBackGround: "white",
    image: teamSvg,
    imgAlt: "Creating an expense manager account is extremely easy",
    imgTitle: "Creating an expense manager account is extremely easy",
    imgWidth: "744.84799",
    imgHeight: "747.07702",
    scrollId : 'signUp'
  },
];

export default landingInfo;
