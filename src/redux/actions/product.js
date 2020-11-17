import http from '../../helpers/http'
import qs from 'qs'

export default {
  getData: (data)=>({
    type: 'GET_DATA',
    payload: http().get('product/?sort[input_date]=desc',qs.stringify(data))
  })
}