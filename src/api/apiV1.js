const apiPath = "https://todoo.5xcamp.us";

// 後端API路徑
export const apiBatch = {
    signUp: `${apiPath}/users`,
    login: `${apiPath}/users/sign_in`,
    postTodos: `${apiPath}/todos`,
    getTodos: `${apiPath}/todos`,
    deleteTodos: `${apiPath}/todos`,
};

/**
 * 傳送post請求
 * @param url {String || Object}
 * @param data {Object}
 * @return {Promise<*>}
 */
export async function postToAPI(url, data) {
    try {
        // 使用 fetch 的第二個參數為物件，其中 method 為請求方法，headers 為請求的標頭，body 為請求的內容
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // 將 response 轉為 json 格式並回傳
        return await response.json();
    } catch (error) {
        // 將錯誤回傳
        return error;
    }
}

