
 "use strict";

/* Controllers */
var githubEvents = {
  CommitCommentEvent: "commented on a commit on {{activity.repo.name}}",
  CreateEvent: "created {{activity.payload.ref_type}}",//ref_type
  DeleteEvent: "deleted {{activity.payload.ref_type}}",//ref_type
  DownloadEvent: "downloaded {{activity.repo.name}}",
  FollowEvent: "followed {{activity.payload.target}}", //target
  ForkEvent: "forked {{activity.repo.name}}", //forkee
  ForkApplyEvent: "applied a patch in {{activity.payload.head}}",//head
  GistEvent: "{{activity.payload.action}} on {{activity.repo.name}}",//action
  GollumEvent: "gollum event on {{activity.repo.name}}",
  IssueCommentEvent: "{{activity.payload.action}} on {{activity.repo.name}}",//action comment
  IssuesEvent: "created an issue on {{activity.repo.name}}",//action
  MemberEvent: "was {{activity.payload.action}} to {{activity.playload.team}}",
  PublicEvent: "published {{activity.repo.name}}",
  PullRequestEvent: "issued a pull request on {{activity.repo.name}}",
  PullRequestReviewCommentEvent: "{{activity.payload.comment}} on {{activity.repo.name}}",
  PushEvent: "pushed to {{activity.repo.name}}",
  TeamAddEvent: "added {{activity.payload.user}} to {{activity.payload.team}}",
  WatchEvent: "{{activity.payload.action}} {{activity.repo.name}}"
};

function sortByDate(array) {
  array.sort(function(a,b){
    a = new Date(a.date);
    b = new Date(b.date);

    return a < b ? -1 : a > b ? 1 : 0;
  });

  return array;
};

function parseTweets(data) {
  if (data) {
    for (var i = 0; i < data.length; i++) {
      data[i].feed_type = "twitter";
      // twitter time "Wed Feb 27 18:52:27 +0000 2013"
      var values = String(data[i].created_at).split(" ");
      var time_value = values[1] + " " + values[2] + ", " +
        values[5] + " " + values[3];
      data[i].date = Date.parse(time_value);
    }

    return data;
  }

  return [];
};

function parseGithubActivity(data) {
  if (data) {
    for (var i = 0; i < data.length; i++) {
      console.log(data);
      data[i].feed_type = "github";
      data[i].date = Date.parse(data[i].created_at);
    }

    return data;
  }

  return [];
}

// the dialog is injected in the specified controller
function DialogController($scope, dialog){
  $scope.close = function(){
    dialog.close();
  };
}

function HomeCtrl($scope, $dialog, socket, StackOverflowService, GitHubService) {
  $scope.feed = {activity: []};

  socket.on('user_timeline', function (data) {
    $scope.feed.activity = $scope.feed.activity.concat(parseTweets(data));
    sortByDate($scope.feed.activity);
  });

  socket.on('mentions_timeline', function (data) {
    $scope.feed.activity = $scope.feed.activity.concat(parseTweets(data));
    sortByDate($scope.feed.activity);
  });

  // socket.on('retweeted_by', function (data) {
  //  $scope.feed.activity = $scope.feed.activity.concat(parseTweets(data));
  //  sortByDate($scope.feed.activity);
  // });

  StackOverflowService.get().success(function (data) {
    $scope.stackOverflow = {};
    $scope.stackOverflow.score = data.items[0].reputation;
    $scope.stackOverflow.badge_counts = data.items[0].badge_counts;
  });

  // GitHubService.get().success(function (response) {
  //  $scope.feed.activity = $scope.feed.activity.concat(parseGithubActivity(response.data));
  //  sortByDate($scope.feed.activity);
  // });

  $scope.portfolio = [
    {
      name: "DC/OS",
      img: "img/dcos-large.jpg",
      img_small: "img/dcos-icon.png",
      summary: "Frontend, user interface and user experince of <b>DC/OS</b>",
      description: "<p><a ng-href=\"https://dcos.io\" target=\"_blank\">DC/OS</a> is a distributed operating system based on the Apache Mesos distributed systems kernel. It enables the management of multiple machines as if they were a single computer. It automates resource management, schedules process placement, facilitates inter-process communication, and simplifies the installation and management of distributed services. Its included web interface and available command-line interface (CLI) facilitate remote management and monitoring of the cluster and its services.</p>",
      url: "https://github.com/dcos/dcos-ui"
    },
    {
      name: "Marathon",
      img: "img/marathon-03.png",
      img_small: "img/marathon-logo-small.jpg",
      summary: "Frontend, user interface and user experince of <b>Marathon</b>",
      description: "<p>Marathon is an Open Source Apache Mesos framework for long-running applications. Part of the <a ng-href=\"https://github.com/mesosphere/marathon\" target=\"_blank\">Mesosphere</a> stack</p><p>As a big <a ng-href=\"https://github.com/mesosphere/marathon/graphs/contributors\" target=\"_blank\">contributor</a> to this project, the graphic and frontend team has taken this project up to a whole other level in terms of design and user experience, compared to the competitors. One of our main goals is to create delious tools for developers, that are easy to use and constantly evolving our solutions to be the best.</p>",
      url: "https://github.com/mesosphere/marathon"
    },
    {
      name: "Nordea Nexus",
      img: "img/Nordea-Nexus.jpg",
      img_small: "img/Nordea-Nexus-small.jpg",
      summary: "User experince, concept development, and client side development",
      description: "<p>In a team of 4 frontend and 5 backend developers we developed a web based service, providing research, facts and analyses for Nordea customers, both in an open and locked in environment. My areas, in particular, consisted of User experince, concept development, and client side development. This larger <a ng-href='http://angularjs.org/''>AngularJS</a> project for <a ng-href='http://www.nordea.com/''>Nordea</a> was launched December 4th. 2013 and is still under development. <a ng-href='https://nexus.nordea.com/'>Nexus</a> is responsive, has IE8+ support and requires a high level of security.</p>",
      url: "http://www.nordeamarkets.com/nordea+markets/what+we+do/e-markets+nexus/1662852.html"
    },
    {
      name: "Roskilde Festival Music Suggest app",
      img: "img/musicSuggest.jpg",
      img_small: "img/musicSuggest-small.jpg",
      summary: "Graphical design, user experience, concept development and development of <b>Roskilde Festival Music Suggest app</b>",
      description: "<p>In this project I did graphical design, user experience, concept development and software development of the app. It is the product of voluntary work with <a ng-href=\"https://twitter.com/erik_beus\" target=\"_blank\">Erik Beuschau</a>. The application won the <a ng-href=\"http://labs.roskilde-festival.dk\" target=\"_blank\">Roskilde Festival App Contest</a> two years in a row and has received much positive feedback in the <a ng-href=\"https://itunes.apple.com/us/app/roskilde-festival-music-suggest/id660891678?mt=8\" target=\"_blank\">App Store</a>.</p><p>This project was, for the time being, a culmination of what I have learnt about concept development, design, user experience, user involvement, information architecture and development for mobile devices from both my study and in my professional career.</p>",
      url: "http://www.creuna.dk/nyheder/sidste-nyt/creuna-udvikler-bygger-roskilde-festival-app/"
    },
    {
      name: "Q8 and F24 app",
      img: "img/q8_f24_news1.jpg",
      img_small: "img/q8_f24_news1-small.jpg",
      summary: "Concept and iPhone version of the <b>Q8 and F24 app</b>",
      description: "<p>I was engaged in the concept development of this project and in the core team developing the iPhone version of the <a ng-href=\"https://itunes.apple.com/us/app/q8/id610415262?mt=8\">Q8</a> and <a ng-href=\"https://itunes.apple.com/us/app/f24/id610763983?mt=8\">F24</a> app.</p><p>Development was done in close relation with the user experience designers, as it is with all of Creunas projects. This allowed us to iterate the process and shape the product accordingly. A technical finesse with this project was that Q8/F24 was able to publish campaigns from their CMS to be injected on all platforms - even these native apps. This was nicely integrated with a carousel and a web view to handle the content.</p><p>The purpose of the app is to serve as the main mobile touch point for Q8 and F24 Danmark and as base for developing a handy information source for petroleum stations.</p>",
      url: "http://www.creuna.dk/nyheder/sidste-nyt/q8-app-genoptanket-med-smarte-features/"
    }
  ];

  $scope.openDialog = function(selectedItem){
    // Inlined template for demo
    var template = (
      '<div class="modal-header">'+
        '<button type="button" class="close" ng-click="close()">×</button>'+
        '<h3>' + selectedItem.name + '</h3>'+
      '</div>'+
      '<div class="modal-body">'+
        '<img class="picture" ng-src="' + selectedItem.img + '" />' +
        selectedItem.description +
        '<p><a ng-href="' + selectedItem.url + '" target="_blank">Read more</a></p>'+
      '</div>'+
      '<div class="modal-footer">'+
        '<button ng-click="close()" class="btn btn-primary" >Close</button>'+
      '</div>'
    );

    var opts = {
      backdrop: true,
      keyboard: true,
      backdropClick: true,
      dialogFade: true,
      backdropFade: true,
      template: template,
      controller: DialogController
    };

    var d = $dialog.dialog(opts);
    d.open();
  };
}

HomeCtrl.$inject = ['$scope', '$dialog', 'socket', 'StackOverflowService', 'GitHubService'];
