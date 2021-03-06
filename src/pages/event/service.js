import axios from 'axios'
import { API_ROOT, getCookie } from 'utils'


async function fetch(year) {
  const csrf = getCookie('csrf_refresh_token')
  const response = await axios.get(
    `${API_ROOT}/event/${year}`,
    {
      headers: { 'X-CSRF-TOKEN': csrf },
    },
  )
  return response.data
}


async function fetchAll(page) {
  const csrf = getCookie('csrf_refresh_token')
  const response = await axios.get(
    `${API_ROOT}/event`,
    {
      headers: {
        'X-CSRF-TOKEN': csrf,
        'X-Page': page,
      },
    },
  )
  return response.data
}


export default {
  fetch,
  fetchAll,
}
