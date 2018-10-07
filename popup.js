// Check url of Chorme tab
chrome.webNavigation.onHistoryStateUpdated.addListener(function () {
   chrome.tabs.query({active: true ,currentWindow: true}, function (tabs)
   {
      var urlWeb = "www.facebook.com";
      if(localStorage.count === 'NaN' || localStorage.count === undefined)
      {
         localStorage.setItem('count', 0);
      }

      // Set time
      if(localStorage.time === 'NaN' || localStorage.time === undefined)
      {
         localStorage.setItem('time', 1);
      }

      // Init time start when connect my facebook
      if(localStorage.start === 'NaN' || localStorage.start === undefined)
      {
         localStorage.setItem('start', 0);
      }

      // Set limit time allow to use facebook
      if(localStorage.maxTime === 'NaN' || localStorage.maxTime === undefined)
      {
         localStorage.setItem('maxTime', 100000000000);
      }

      // Find string urlWeb = www.facebook.com into current url
      if(tabs[0].url.indexOf(urlWeb) !== -1)
      {
         localStorage.count = Number(localStorage.count) + 1;
         localStorage.time += 1;
      }
   });

   if(Number(localStorage.maxTime) < Number(localStorage.time))
   {
      alert('Bạn đã dành quá nhiều thời gian cho facebook!');
   }
});

// Time calculations for hours, minutes and seconds
String.prototype.convertTime = function () {
   var sec_num = parseInt(this, 10); // don't forget the second param
   var hours   = Math.floor(sec_num / 3600);
   var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
   var seconds = sec_num - (hours * 3600) - (minutes * 60);

   if (hours < 10)
      hours = "0" + hours;
   if (minutes < 10)
      minutes = "0" + minutes;
   if (seconds < 10)
      seconds = "0" + seconds;
   return hours + 'h '+ minutes + 'm ' + seconds + 's';
};

// Show entrances to facebook
function showEntrances() {
   var countVisited = localStorage.count;
   document.getElementById('entrances').innerHTML = Math.abs(countVisited);
}

// Show time access facebook
function showAccessTime() {
   var tempTime = localStorage.time;
   document.getElementById('accessTime').innerHTML = tempTime.toString().convertTime();
}

// Show limit time access facebook
function showMaxAccessTime() {
   var tempMaxTime = localStorage.maxTime;
   document.getElementById('maxAccessTime').innerHTML = tempMaxTime.toString().convertTime();
}

// Setup max time access facebook
function setMaxTime() {
   var hours = document.getElementById('hours').value;
   var minute = document.getElementById('minute').value;
   var seconds = document.getElementById('seconds').value;
   var valueSetTime = Math.floor(hours*3600) + Math.floor(minute*60) + Math.floor(seconds);

   // Validate data
   if(hours < 0 || hours > 24 || minute < 0 || minute > 60 || seconds < 0 || seconds > 60)
      alert('Thời gian nhập vào không hợp lệ!');
   else
   {
      localStorage.setItem('maxTime', valueSetTime);
      document.getElementById('maxAccessTime').innerHTML = valueSetTime.toString().convertTime();
      alert('Bạn đã thay đổi thời gian được sử dụng facebook');
   }
}

// Clear all data
function clearData() {
   // Reset variable global to default
   localStorage.setItem('count', 0);
   localStorage.setItem('time', 0);
   localStorage.setItem('maxTime', 0);

   // Show data after reset
   document.getElementById('entrances').innerHTML = localStorage.count;
   document.getElementById('accessTime').innerHTML = localStorage.time.toString().convertTime();
   document.getElementById('maxAccessTime').innerHTML = localStorage.maxTime.toString().convertTime();
}

function main(){
   document.getElementById('btnEntrances').addEventListener('click', showEntrances);
   document.getElementById('btnAccessTime').addEventListener('click', showAccessTime);
   document.getElementById('btnMaxAccessTime').addEventListener('click', showMaxAccessTime);
   document.getElementById('btnClear').addEventListener('click', clearData);
   document.getElementById('btnSubmit').addEventListener('click', setMaxTime);
}

document.addEventListener('DOMContentLoaded', function () {
   main();
});

// Reference
// https://developer.chrome.com/extensions/contentSecurityPolicy#JSExecution