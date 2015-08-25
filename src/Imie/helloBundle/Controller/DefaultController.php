<?php

namespace Imie\helloBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('ImiehelloBundle:Default:index.html.twig', array('name' => $name));
    }
}
