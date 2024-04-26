function convertSessionStorageToURLLink() {
    const sessionStorageKey = "__telegram__initParams";
    const sessionStorageData = sessionStorage.getItem(sessionStorageKey);
    const localStorageKey = "CAT_LOGINDATA_1";
    const token = JSON.parse(localStorage.getItem(localStorageKey)).token;
    if (!sessionStorageData) {
        console.log("Session storage data not found.");
        return;
    }

    const initData = JSON.parse(sessionStorageData);
    const baseLink = "https://tgsvr.catizen.ai/api/bot/tmas/gameapp/catizenbot";
    const botname = "catizenbot";
    const tguserid = Telegram.WebApp.initDataUnsafe.user.id;
    const tgusername = Telegram.WebApp.initDataUnsafe.user.username;
    const ts = initData.auth_date;
    const sign = initData.hash;
    const queryData = encodeURIComponent((initData.tgWebAppData));

    const queryParams = `botname=${botname}&token=${token}&tguserid=${tguserid}&tgusername=${tgusername}&ts=${ts}&sign=${sign}#tgWebAppData=${queryData}&tgWebAppVersion=${initData.tgWebAppVersion}&tgWebAppPlatform=${initData.tgWebAppPlatform}&tgWebAppBotInline=${initData.tgWebAppBotInline}&tgWebAppThemeParams=${encodeURIComponent(initData.tgWebAppThemeParams)}`;

    return `${baseLink}?${queryParams}`;
}

const urlLink = convertSessionStorageToURLLink();
console.log(urlLink);