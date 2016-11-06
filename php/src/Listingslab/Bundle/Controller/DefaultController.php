<?php

namespace Listingslab\Bundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class DefaultController extends Controller
{
    public function indexAction($name = null)
    {
        return $this->render('ListingslabBundle:Default:index.html.twig', array('name' => $name));
    }

    public function apiAction()
    {
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $data = array ();

        $data['description'] = 'Fake API response for Levaux Knockout & Symfony Demo';
        $data['success'] = true;
        $data['time'] = time ();
        $data['title'] = 'No.1 Poultry';
        $data['address'] = 'London EC2R 8EJ';
        $data['link'] = 'https://en.wikipedia.org/wiki/No_1_Poultry';
        $data['img'] = '/img/1_Poultry.jpg';

        $data['sensor_data'] = array ();
        $data['sensor_data']['lighting'] = $this->makeData(100);
        $data['sensor_data']['safety'] = $this->makeData(75);
        $data['sensor_data']['climate'] = $this->makeData(25);
        $data['sensor_data']['security'] = $this->makeData(0);
        $data['sensor_data']['utilisation'] = $this->makeData(50);

        $response->setContent(json_encode($data));
        return $response;
    }

    public function makeData ($seed){
        $arr = array ();
        $last = $seed;
        $variation = 7;
        for ($x = 0; $x < 30; $x++) {
            $last = mt_rand($last-$variation, $last+$variation);
            if ($last > 100){
                $last = 100;
            }else if ($last < 0){
                $last = 0;
            }
            $arr[] = $last;
        }
        return $arr;
    }
}
