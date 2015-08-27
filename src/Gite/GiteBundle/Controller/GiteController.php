<?php

namespace Gite\GiteBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class GiteController extends Controller
{
    public function getGiteAction($id)
    {

        $em = $this->getDoctrine()->getManager();
        $gite = $em->getRepository('GiteBundle:Gite')->find($id);

        return $this->render('GiteBundle:Gite:view.html.twig', array('gite' => $gite));
    }

    public function ListGitesAction()
    {
        return $this->render('GiteBundle:Gite:listview.html.twig');
    }

    public function getListGitesAction()
    {
        $em = $this->getDoctrine()->getManager();
        $gites = $em->getRepository('GiteBundle:Gite')->findAll();

        return $this->render('GiteBundle:Gite:listview.html.twig', array('gites' => $gites));

    }
}
