<?php

namespace Gite\GiteBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('GiteBundle:Default:index.html.twig', array('name' => $name));
    }
}
