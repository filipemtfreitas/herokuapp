function getSessionList(success, error) {
  var soql = "SELECT Session__c.Id, Session__c.Name FROM Session_Speaker__c";
  force.query(soql, success, error);
}

function getSessionDetails(success, error) {
  var soql = "SELECT Name, " +
  "Session_Date__c, " +
  "Speaker_Name__c, " +
  "FROM Session_Speaker__c ";
  force.query(soql, success, error);
}

function showSessionList() {
    getSessionDetails(
        function (data) {
            var sessions = data.records,
                html = '';
            for (var i=0; i<sessions.length; i++) {
                html += '<li class="table-view-cell">'+ sessions[i].Name + '</a></li>';
            }
            
        },
        function (error) {
            alert("Error: " + JSON.stringify(error));
        });
    return false;
}

function showSessionDetails(sessionId) {

    getSessionDetails(sessionId,
        function (data) {
            var session = data.records[0],
            html =
                '<div class="page">' +
                '<header class="bar bar-nav">' +
                '<a class="btn btn-link btn-nav pull-left" href="#"><span class="icon icon-left-nav"></span>Back</a>' +
            '<h1 class="title">Sessions</h1>' +
                '</header>' +
                '<div class="content">' +
                    '<div class="card">' +
                        '<ul class="table-view">' +
                            '<li class="table-view-cell">' +
                                '<h4>' + session.Session__r.Name + '</h4>' +
                                '<p>' + (session.Session__r.Session_Date__c || 'No time yet')+ '</p>' +
                            '</li>' +
                            '<li class="table-view-cell">Speaker: ' +
                                session.Speaker__r.Speaker_Name__c +
                            '</li>' +
                        '</ul>' +
                    '</div>' +
                '</div>' +
                '</div>';
            slider.slidePage($(html));
        },
        function (error) {
            alert("Error: " + JSON.stringify(error));
        });
    return false;
}

var slider = new PageSlider($('body')); // Initialize PageSlider micro-library for nice and hardware-accelerated page transitions
router.addRoute('', showSessionList);
router.addRoute('sessions/:id', showSessionDetails);
