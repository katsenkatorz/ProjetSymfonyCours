<?php

namespace Gite\GiteBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class GiteController extends Controller
{
    public function indexAction($id)
    {

        $em = $this->getDoctrine()->getManager();
        $gite = $em->getRepository('GiteBundle:Gite')->find($id);

        return $this->render('GiteBundle:Gite:list.html.twig', array('gite' => $gite));
    }
}
