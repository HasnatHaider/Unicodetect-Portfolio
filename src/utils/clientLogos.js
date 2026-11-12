import bmsLogo from "../assets/images/clients/bms-logo.webp";
import boatBuddyLogo from "../assets/images/clients/boatbuddy-logo.webp";
import careCompassIcon from "../assets/images/clients/carecompass-icon.webp";
import contractorConnectIcon from "../assets/images/clients/contractorconnect-icon.webp";
import dailyDigestIcon from "../assets/images/clients/dailydigest-icon.webp";
import dailyDigestIconTransparent from "../assets/images/clients/dailydigest-icon-transparent.webp";
import iconicBeautiLogo from "../assets/images/clients/iconic-beauti-logo.webp";
import liftPitchLogo from "../assets/images/clients/liftpitch-logo.webp";
import liftPitchLogoTransparent from "../assets/images/clients/liftpitch-logo-transparent.webp";
import quickZipIcon from "../assets/images/clients/quickzip-icon.webp";
import spinTheNightLogo from "../assets/images/clients/spin-the-night-logo.webp";
import taskHiveIcon from "../assets/images/clients/taskhive-icon.webp";

// width/height are the intrinsic pixel size of each optimised file.
// `wide` marks horizontal wordmarks that need a wider tile than a square icon.
// `transparentSrc` is the same artwork with its white backdrop removed, for
// placements that sit directly on a tinted background instead of a white tile.
export const clientLogos = {
  bms: {
    src: bmsLogo,
    width: 166,
    height: 160,
    name: "BMS Computer Management",
    alt: "BMS Computer Management logo",
    initials: "BMS",
  },
  quickzip: {
    src: quickZipIcon,
    width: 303,
    height: 160,
    name: "QuickZip",
    alt: "QuickZip app icon",
    initials: "QZ",
  },
  taskhive: {
    src: taskHiveIcon,
    width: 136,
    height: 160,
    name: "TaskHive Pro",
    alt: "TaskHive Pro app icon",
    initials: "TH",
  },
  carecompass: {
    src: careCompassIcon,
    width: 164,
    height: 160,
    name: "CareCompass",
    alt: "CareCompass app icon",
    initials: "CC",
  },
  dailydigest: {
    src: dailyDigestIcon,
    transparentSrc: dailyDigestIconTransparent,
    width: 159,
    height: 160,
    name: "DailyDigest",
    alt: "DailyDigest app icon",
    initials: "DD",
  },
  contractorconnect: {
    src: contractorConnectIcon,
    width: 183,
    height: 160,
    name: "ContractorConnect",
    alt: "ContractorConnect app icon",
    initials: "CO",
  },
  spinTheNight: {
    src: spinTheNightLogo,
    width: 185,
    height: 160,
    name: "Spin The Night",
    alt: "Spin The Night logo",
    initials: "STN",
  },
  iconicBeauti: {
    src: iconicBeautiLogo,
    width: 320,
    height: 107,
    name: "Iconic Beauti",
    alt: "Iconic Beauti logo",
    initials: "IB",
    wide: true,
  },
  liftpitch: {
    src: liftPitchLogo,
    transparentSrc: liftPitchLogoTransparent,
    width: 320,
    height: 62,
    name: "LiftPitch",
    alt: "LiftPitch logo",
    initials: "LP",
    wide: true,
  },
  boatBuddy: {
    src: boatBuddyLogo,
    width: 295,
    height: 160,
    name: "BoatBuddy",
    alt: "BoatBuddy logo",
    initials: "BB",
  },
};
