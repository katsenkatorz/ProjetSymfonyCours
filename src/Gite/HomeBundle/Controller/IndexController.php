<?php

namespace Gite\HomeBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class IndexController extends Controller
{
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();
        $gites = $em->getRepository('GiteBundle:Gite')->findAll();

        return $this->render('HomeBundle:Index:index.html.twig', array('gites' => $gites));

    }
}
