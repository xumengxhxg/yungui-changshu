// 日期格式化
export function formatDate(time) {
  if (time === null || time === '') return ''
  const date = new Date(time)
  const year = date.getFullYear()
  const month =
    date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  // const hours =
  //   date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  // const minutes =
  //   date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  // const seconds =
  //   date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return year + '-' + month + '-' + day
}

export function formatMonthAndDate(time) {
  if (time === null || time === '') return ''
  const date = new Date(time)
  const year = date.getFullYear()
  const month =
    date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  // const hours =
  //   date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  // const minutes =
  //   date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  // const seconds =
  //   date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return month + '-' + day
}

export function rowClass() {
  return {color: '#333'}
}

export function formatDate2(time) {
  if (time === null || time === '') return ''
  const date = new Date(time)
  const year = date.getFullYear()
  const month =
    date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  const hours =
    date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const minutes =
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  const seconds =
    date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
}

export function formatDate3(time) {
  if (time === null || time === '') return ''
  const date = new Date(time)
  const year = date.getFullYear()
  const month =
    date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  var day_1 = date.getDay();
  var weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
  var week = weeks[day_1];
  return year + '年' + month + '月' + day + '日'+week
}

export function formatDate4(time) {
  if (time === null || time === '') return ''
  const date = new Date(time)
  const year = date.getFullYear()
  const month =
    date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  var day_1 = date.getDay();
  var weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
  var week = weeks[day_1];
  const hours =
    date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const minutes =
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  return year + '年' + month + '月' + day + '日'+week+ ' ' + hours + ':' + minutes
}

export function rTime(date) {
  var json_date = new Date(date).toJSON();
  return new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
}

export function download(file_name, content) {
  var csvData = new Blob([content], { type: 'text/csv' });
  // for IE
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(csvData, file_name);
  }
  // for Non-IE (chrome, firefox etc.)
  else {
      var a = document.createElement('a');
      document.body.appendChild(a);
      a.style = 'display: none';
      var url = window.URL.createObjectURL(csvData);
      a.href =  url;
      a.download = file_name;
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
  }
}
