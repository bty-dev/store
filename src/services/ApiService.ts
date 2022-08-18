import axios from 'axios';

const BASE_URL: string = "https://localhost:44302/api/Portal";

export default axios.create({
    baseURL: BASE_URL,
    // headers: {
    //     Authorization: "CfDJ8HqOJTQtUp9Bm9NPTY5YmqPnrclaTXWfbMBwrrdJqChnGQP9AmBM5zdwcj4dR5x0Z_GDA7_8bdUPFGYEzJH4GsPbxBVUXppUcvksAjiHhTj83fXIXcAHUl_8mF6t6rtKH2LpKX6voaQ-FUyYQv6vXCnfKBuh3I332TmO4jG-KiHl6FJwIqfv3ONnAM1xL47PRU0nAkf0kQCFnNCZ-SPZt4M04bPGVBZttuy7AlwaRS9Ix37pcA068vJrcZBekLcoVOtThmWd609vMc9b8WOm2ZGSZAMGMLXLrG-yYl3CbJqGmZfQDsiAtKvoEda5UeRULQkM0x-S6muMJhqUMg-mZXiHx12fFpprO2eZ0wgCwYec1eB2IpCLgMqQbmrK2nZLcicaSIBSWJIPbw1DhKQYeyBnXph1N-PQIny7q9HeFNrBNsTFZdDFWsMVlgn2ZrYh3T0img2EHRrzsQInpm7TiZxvExBv9CmhYm7OckWz7Y97sEsBv5vX3M5yXjpdEyW7dSj1xNz58ZxBS9PL73fwcEa1DpvbuV1shsJp5skcEN4mS3tAAGsNrXUvrk9U2xUEawLjA_zxBCihtJe5CRb0x_jpiYRxoCELzotqjFMEZJdYu1dd0uATIAVoU9nRFrOZ1y1baCFNiyDDTnHN6adH04bktsGERAx-gSsBK5tWotjjIW_XLXu2UU-JpT2mQSklG5zwEFO2qQsLVMqBZt7i1xczt7rqtSd7JFHxOf6m4y7jQJHTQUxf8whDJBifm0efXQE2BJp9eBb0wRPRw7rS01ttLMW-ywisPqiSwO2hQxDwGpElZ7boRh_SIlFzp7A7DetQJTaBdzPQodtTSog3ZtSbn5ljTFZWoRi_ScHrEKi7qeZkoacm2DaTCYtOPoBHqw0XeMfAwCzghlMA1VuLTcs0brUrOEsOx-rOTckY79H_q6R8ZQ633MUop5ULe6rpZak2yfEJO-kaF-DzAvo7r1NgoDcWsTK9naZMMDR5oMXJpCTiG-3E69xuiTO8m2JY5CevYvhCgLF9pDnZxgO2iZe_CScNOI5Jeb2yQuLEm_GRyXS-ufT5I4FgjM1W1cBNm4G1B3E8It13jGuXdqP8jxespk634vCiZyt81esW0657UBc-ryETnjS1ii_HctWpa4GydDEtHetDzmWTNF5EEdTveb2uq6dlM83yV6Q6lzEF-mQ211sNeBq5DveJ6pA2cpRRUpF4ogpBX1pNoElUQrz4BbodfGScChDc8qi3-1zVgj5L2me4E5P-_QBarv7bZ3081pOPRDuHpj9_4UDDOITQcAYBlm_Y7NsU5iGk683iDHQnGPMLeHk9XfMUk5lxnUgYAwshXe1ptylhaasn9LvHt9N-FSIoomuVQU7CDyNYYls0HHzyOL5E3dsHmgn66T0wWZCpxCrhXRG-8hNZouV7VZ8KhtM5trjAmoG7xSSrcHykPgiWQu7y48EePfg5OzndBB7I1iIwXp6NnVBu_pNjfGiUTRAU0ncpkMaoxo7qW2uXUoL4RY3_jkUFQWk9SuhUMAeKa33feG161BKC3OlW25QN1v3aEbMwY6Y22pahyOo_0woNrbGX62CtX00rwpi895UV4GPaMhfY8evEUS45jHTjRpVmNVt0NjrkeeSU1QkW06kevTYcjFVgmssolVaZeSjJdD2XUzLminWE8IlOMyPhPTFMgKjMaoXBtu8T_rDwAoC2zGGfkJi4jZwXcJCJgWC6a56u-fh5eNdgUGTw2epG2WGxScoRzwqf9xai-5RReMHcktL1ZHeGnxkdge5vSAC_2VbLKd7nv870aDqt_4DVSIjrGKmZ7xjxkaLaVK7CoBMz1FfffyITDEduu4BCznnHqq83U4p98iO2Id6y_kbF8EZFJ9cu7phsvuYEVaI_NuPFQKrU8UbKLsYqvjK35XUf7GMTTI4tbd5u96TB2Fb6zqR-TEYSdAE7aGaIWC_fFGzteAVOGY7ZRqSPodTiBCAroiSqWRkYeR-jnMjm3mXQG9mnZsPydw5hGRNhmPd2AJGslC0Jqxh-x-3WWoxX2IQM0L5ao8H877emqh6ZwQps6eusyN5VJJMNAWUeZ0MnSdR0RKDfjOMD1xR_JMQ2pIngJAeWUcSNijZ2sPxcROxPnhsfQnCpE_vreauwqKj1j7XAUdThGGwWcolOeoB5qcEg9iLquJVXSCt7d7MqfnlH2g8HE9P8nHPnJu9MsBsIKuLJQGGX8R5VTpaxSbQkczET7vxJbGb6LOZniJsM88rVHDKEmUwzGX0ldZviO_QPGWEWX0Qgp4fpF8ESnMi5hosvr0XysP08yt1BTzc4i-pyXmMzJLlyjh2fWl6VYjJ2DYMEvJRDKisqe6CXwkDsIEyRsm_zAqk0vcarpgcFP1D1aOxbFgEK_W3sQV-6caDZ12o4Lq9cNLR_1oh_c2GRp58-PoRPBSuz-DCVuJNpXHdqlvEQmvxpqOhXzecW9LMOg2J4Bw9aSIPYaZj0lhGTswKz-xcN5Nxo_QqGinw-Ld14VKYdoT-O9ZAHd0JTje8LQbfPEWTLv8j7rp_PzgYHbCXzoYBAXSRt78P639_GkC3_8K9TbNjZ2hdU4rI1"
    // }
})

//Есть пару вопросов по работе с внешними стейтами, посоветуюсь с Владом

export const getMarkets = async () => {
    axios.get("/GetMarkets")
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
}
export const getGoods = async () => {
    axios.get("/GetGoods")
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
}
export const getGategoriesAndGroups = async () => {
    axios.get("/GetCategoriesAndGroups")
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
            let a = 2
        });
}
export const setDefaultCategory = async (scaleId: number, categoryId: number) => {
    axios.post("/SetDefaultCategory", {scaleId, categoryId})
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
}
export const setGroupCategory = async (groupId: number, categoryId: number) => {
    axios.post("/SetGroupCategory", {groupId, categoryId})
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
}