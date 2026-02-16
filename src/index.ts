import { noDeprecatedOptions } from "./rules/no-deprecated-options";
import { accessibleAvatar } from "./rules/accessible-avatar";
import { accessibleActionMenu } from "./rules/accessible-action-menu";
import { accessiblePicker } from "./rules/accessible-picker";
import { accessibleDialogWrapper } from "./rules/accessible-dialog-wrapper";
import { accessibleProgressBar } from "./rules/accessible-progress-bar";
import { accessibleClearButton } from "./rules/accessible-clear-button";
import { validateThemeContext } from "./rules/validate-theme-context";
import { overlayTriggerTriggeredBy } from "./rules/overlay-trigger-triggered-by";

const rules = {
  "no-deprecated-options": noDeprecatedOptions,
  "accessible-avatar": accessibleAvatar,
  "accessible-action-menu": accessibleActionMenu,
  "accessible-picker": accessiblePicker,
  "accessible-dialog-wrapper": accessibleDialogWrapper,
  "accessible-progress-bar": accessibleProgressBar,
  "accessible-clear-button": accessibleClearButton,
  "validate-theme-context": validateThemeContext,
  "overlay-trigger-triggered-by": overlayTriggerTriggeredBy,
};

const configs = {
  recommended: {
    plugins: ["spectrum-web-components"],
    rules: {
      "spectrum-web-components/no-deprecated-options": "warn",
      "spectrum-web-components/accessible-avatar": "warn",
      "spectrum-web-components/accessible-action-menu": "warn",
      "spectrum-web-components/accessible-picker": "warn",
      "spectrum-web-components/accessible-dialog-wrapper": "warn",
      "spectrum-web-components/accessible-progress-bar": "warn",
      "spectrum-web-components/accessible-clear-button": "warn",
      "spectrum-web-components/validate-theme-context": "warn",
      "spectrum-web-components/overlay-trigger-triggered-by": "warn",
    },
  },
};

export = { rules, configs };
