import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const WorldCoinVerification = buildModule("WorldCoinVerification", (m) => {
    const _appId = m.getParameter("_appId", "app_staging_1960971445b5b83af1cd3c30d82eb246");
    const _action = m.getParameter("_action", "verify-human");
    const _worldIdAddress = m.getParameter("_worldIdAddress", "0x11cA3127182f7583EfC416a8771BD4d11Fae4334");


    const worldCoinVerification = m.contract("WorldCoinVerification", [_worldIdAddress, _appId, _action]);

    return { worldCoinVerification };
});

export default WorldCoinVerification;