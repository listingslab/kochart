<h3><a href="https://github.com/listingslab/kochart" target="_blank"><img src="http://kochart-listingslab.rhcloud.com/img/github.png" align="right" /></a>The Github repository for this application is publically available here: <a href="https://github.com/listingslab/kochart" target="_blank">https://github.com/listingslab/knockout</a></h3>

<h3>Cloud Server</h3>
<p>First we used Red Hat's excellent and free <a href="https://www.openshift.com" target="_blank">OpenShift</a> PaaS to spin up a publically accessible, working Symfony App in a couple of minutes. OpenShift applications are automatically created as Git repos, meaning we simply clone the repo locally, develop it and then push the master branch to the repo's origin on OpenShift to deploy the live application.

<h3>Development Environment</h3>
<p>After cloning the repo, we needed to install the Symfony dependencies to get the App running locally. See this link for info on how to use <a href="https://getcomposer.org/download/" target="_blank">composer</a>. Once we had installed our dependencies, we pointed the root directory of our Apache webserver running PHP 5.6.2 to php/web to complete the setup of our Symfony development environment.</p>

<h3>Symfony</h3>
<p>We wanted Symfony to do 2 things.</p> 
<ol>
    <li>To provide a basic API-like data source for our application on the url <a href="http://kochart-listingslab.rhcloud.com/api" target="blank">/api/</a></li>
    <li>To render our front end Single Page App on the root URL</li>
</ol>
<p>To this end, we created a new Bundle to handle it; <a href="https://github.com/listingslab/kochart/tree/master/php/src/Listingslab/Bundle" target="_blank">Listingslab/Bundle</a> using the Symfony2 bundle generator (php app/console generate:bundle)
There are 3 files to look at.</p> 

<ul>
    <li><a href="https://github.com/listingslab/kochart/blob/master/php/src/Listingslab/Bundle/Resources/config/routing.yml" target="blank">routing.yml</a><br/>Handles routing to give us an API endpoint and a SPA on the root URL</li>
    <li><a href="https://github.com/listingslab/kochart/blob/master/php/src/Listingslab/Bundle/Resources/views/Default/index.html.twig" target="_blank">index.html.twig</a><br />The template for the Single Page App served from the root URl.</li>
    <li><a href="https://github.com/listingslab/kochart/blob/master/php/src/Listingslab/Bundle/Controller/DefaultController.php" target="_blank">DefaultController.php</a><br />PHP code to create a fake API response.</li>
</ul>

<h3>The Frontend Plan</h3>
<p>The front end is a combination of third party JavaScript libraries (Knockout, Chart.js, jQuery) and Twitter's Boostrap to provide a simple, quick but responsive & moderen layout. The intention was to create a chart of the data from the API and then update the data with new values every few seconds. Making the chart data Observable Arrays allows knockout to handle the UI update and we decided to extend that to create a table of constantly updating values and averages for the changing data. The resulting app is a very rough working prototype for a real time sensor monitoring frontend.</p>

<h3>Frontend Development with Gulp & Bower</h3>
<p>To facilitate the development of the frontend, we kept all development assets in a folder called 'frontend' and use <a href="https://github.com/listingslab/kochart/blob/master/gulpfile.js" target="_blank">Gulp</a> to watch for any changes and to copy the files to the right places in the Symfony app. Alongside Gulp we also used <a href="https://bower.io/" target="_blank">Bower</a> to manage our front end dependencies such as Bootstrap & Knockout etc. When developing the fontend, we simply run 'gulp' in the commandline and let the automation take care of itself.</p>

<h3>The <a href="https://github.com/listingslab/kochart/blob/master/frontend/js/main.js" target="_blank">main.js</a>    </h3>
<p>Once the SPA was set up, we could finally concentrate on the JavaScript to connect everything up and create the App. On Document Ready, we load the data using $.getJSON( '/api'). When the loading is complete we set up our knockout observables.</p>