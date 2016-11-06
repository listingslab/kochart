<h3>Open Source on Github</h3>
<p>The Github repository for this application is publically available here: <a href="https://github.com/listingslab/knockout" target="_blank">https://github.com/listingslab/knockout</a></p>

<h4>Cloud Server</h4>
<p>First we used Red Hat's excellent and free <a href="https://www.openshift.com" target="_blank">OpenShift</a> PaaS to spin up a publically accessible, working Symfony App in a couple of minutes. OpenShift applications are automatically created as Git repos, meaning we simply clone the repo locally, develop it and then push the master branch to the repo's origin on OpenShift to deploy the live application.

<h4>Development Environment</h4>
<p>After cloning the repo, we needed to install the Symfony dependencies to get the App running locally. See this link for info on how to use <a href="https://getcomposer.org/download/" target="_blank">composer</a>. Once we had installed our dependencies, we pointed the root directory of our Apache webserver running PHP 5.6.2 to php/web to complete the setup of our Symfony development environment.</p>

<h4>Symfony JSON API</h4>
<p>We wanted Symfony to do 2 things.</p> 
<ol>
    <li>To provide a basic API-like data source for our application on the url <a href="http://knockout-listingslab.rhcloud.com/api" target="blank">/api/</a></li>
    <li>To render our front end Single Page App on the root URL</li>
</ol>
<p>To this end, we created a new Bundle to handle it; <a href="https://github.com/listingslab/knockout/tree/master/php/src/Listingslab/KockoutChartBundle" target="_blank">Listingslab/KockoutChartBundle</a> using the Symfony2 bundle generator (php app/console generate:bundle)
There are 3 files to look at.</p> 

<ul>
    <li><a href="https://github.com/listingslab/knockout/blob/master/php/src/Listingslab/KockoutChartBundle/Resources/config/routing.yml" target="blank">routing.yml</a><br/>(Handles routing to give us an API endpoint and a SPA on the root URL)</li>
    <li><a href="https://github.com/listingslab/knockout/blob/master/php/src/Listingslab/KockoutChartBundle/Resources/views/Default/index.html.twig" target="_blank">index.html.twig</a></li>
    <li><a href="https://github.com/listingslab/knockout/blob/master/php/src/Listingslab/KockoutChartBundle/Controller/DefaultController.php" target="_blank">DefaultController.php</a></li>
</ul>

<p>The new bundle is included in the AppKernel.php file, so we removed the reference to the ACME bundle.</p>