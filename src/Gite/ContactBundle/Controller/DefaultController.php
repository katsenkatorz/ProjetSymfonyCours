<?php

namespace Gite\ContactBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('ContactBundle:Default:index.html.twig', array('name' => $name));
    }
}
