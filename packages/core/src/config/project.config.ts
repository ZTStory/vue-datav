enum ENV_MODE {
    DEVELOPE = "DEVELOPE",
    TEST = "TEST",
    SIMULATER = "SIMULATER",
    RELEASE = "RELEASE",
}
interface BBProjectConfig {
    projectVer: string;
    env: ENV_MODE;
}

export { ENV_MODE };
export type { BBProjectConfig };
