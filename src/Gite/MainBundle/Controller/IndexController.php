<?php

namespace Gite\MainBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class IndexController extends Controller
{
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();
        $gites = $em->getRepository('GiteBundle:Gite')->findAll();

        return $this->render('MainBundle:Index:index.html.twig', array('gites' => $gites));

    }

    public function indexAdminAction()
    {
        $em = $this->getDoctrine()->getManager();
        $gites = $em->getRepository('GiteBundle:Gite')->findAll();
        return $this->render('MainBundle:Index:index_admin.html.twig', array('gites' => $gites));
    }
}
