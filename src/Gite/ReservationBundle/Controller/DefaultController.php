<?php

namespace Gite\ReservationBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('ReservationBundle:Default:index.html.twig', array('name' => $name));
    }
}
