import { ENV_MODE, BBProjectConfig } from "@ztstory/datav-core/src/config/project.config";

interface BProjectConfig extends BBProjectConfig {
    token: string;
}

export const ProjectConfig: BProjectConfig = {
    env: import.meta.env.VITE_APP_ENV ?? ENV_MODE.RELEASE,
    projectVer: "1.0.0",
    token: "",
};
