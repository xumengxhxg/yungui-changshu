"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWaringList = getWaringList;
exports.dealWarning = dealWarning;
exports.getEarlyWaringDropdown = getEarlyWaringDropdown;
exports.updateclickProcess = updateclickProcess;

var _request = _interopRequireDefault(require("../utils/request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var request = _request["default"].axios; //获取预警tablelist查询

function getWaringList(params) {
  return request({
    url: '/pendingjudge/earlyWarning/getWaringList?pageNum=' + params.pageNum + '&pageSize=' + params.pageSize,
    // url:'/pendingjudge/earlyWarning/getWaringList?pageNum=1&pageSize=5',
    method: 'post',
    data: params
  });
} //删除预警


function dealWarning(params) {
  return request({
    url: '/pendingjudge/earlyWarning/dealWarning',
    method: 'post',
    data: params
  });
} //预警下拉菜单


function getEarlyWaringDropdown(params) {
  return request({
    url: '/pendingjudge/earlyWarning/getEarlyWaringDropdown',
    method: 'post',
    data: params
  });
} //一键处理


function updateclickProcess(params) {
  return request({
    url: '/pendingjudge/earlyWarning/updateclickProcess',
    method: 'post',
    data: params
  });
}