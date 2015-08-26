<?php

namespace Gite\GalerieBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('GalerieBundle:Default:index.html.twig', array('name' => $name));
    }
}
