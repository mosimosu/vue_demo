const apiPath = 'https://todoo.5xcamp.us'

// 後端API路徑
export const apiBatch = {
  signUp: `${apiPath}/users`,
  login: `${apiPath}/users/sign_in`,
  postTodos: `${apiPath}/todos`,
  getTodos: `${apiPath}/todos`,
  deleteTodos: `${apiPath}/todos`,
  check: `${apiPath}/check`,
}

/**
 * 傳送post請求
 * @param url {String}
 * @param method {String}
 * @param token {String || null}
 * @param data {Object}
 * @return {Promise<*>}
 */
export async function postToAPI({ url, method = 'post', token = null, data }) {
  try {
    // 使用 fetch 的第二個參數為物件，其中 method 為請求方法，headers 為請求的標頭，body 為請求的內容
    const response = await fetch(
      `${url}${data.id ? `/${data.id}` : ''}${method === 'patch' ? '/toggle' : ''}`,
      {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token.split(' ')[1]}` : '',
        },
        body: JSON?.stringify(data),
      }
    )

    // 將 response回傳
    return await response
  } catch (error) {
    // 將錯誤回傳
    return error
  }
}

/**
 * 傳送get請求
 * @param url {String || Object}
 * @param headers {Object}
 * @return {Promise<*>}
 */
export async function getToAPI(url, headers) {
  try {
    // 使用 fetch 的第二個參數為物件，其中 method 為請求方法
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${headers.split(' ')[1]}`,
      },
    })

    // 將 response 回傳
    return await response
  } catch (error) {
    // 將錯誤回傳
    return error
  }
}
