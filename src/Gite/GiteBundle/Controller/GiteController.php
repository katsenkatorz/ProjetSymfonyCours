<?php

namespace Gite\GiteBundle\Controller;

use Gite\GiteBundle\Entity\Gite;
use Gite\GiteBundle\Form\GiteType;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;

class GiteController extends Controller
{
    public function getGiteAction(Request $request, $id)
    {

        $em = $this->getDoctrine()->getManager();
        $gite = $em->getRepository('GiteBundle:Gite')->find($id);

        /* Forumlaire préreservation */
        $defaultData = array('message' => 'Type your message here');
        $form = $this->createFormBuilder($defaultData)
            ->setAction($this->generateUrl('reservation_new'))
            ->add('arrival', 'datetime', array('widget' => 'single_text', 'format' => 'dd/MM/yyyy'))
            ->add('departure', 'datetime', array('widget' => 'single_text', 'format' => 'dd/MM/yyyy'))
            ->add('idGite', 'hidden')
            ->add('Reserver', 'submit')
            ->getForm();


        return $this->render('GiteBundle:Gite:view.html.twig', array(
            'gite' => $gite,
            'pre_resa' => $form->createView(),
        ));
    }

    public function ListGitesAction()
    {
        return $this->render('GiteBundle:Gite:listview.html.twig');
    }

    public function getListGitesAction()
    {
        $em = $this->getDoctrine()->getManager();
        $gites = $em->getRepository('GiteBundle:Gite')->findAll();

        return $this->render('GiteBundle:ModuleUsed:listgite.html.twig', array('gites' => $gites));

    }

    /**
     * @Template("GiteBundle:Gite:new.html.twig")
     */
    public function newGiteAction(Request $request)
    {
        $gite = new Gite();

        $form = $this->newForm($gite);

        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($gite);
            $em->flush();

            return $this->redirect($this->generateUrl('gite_listview'));

        }
        return array(
            'formulaire_gite' => $form->createView(),
        );
    }


    /**
     * @Template("GiteBundle:Gite:new.html.twig")
     */
    public function updateGiteAction(Request $request)
    {
        $gite = new Gite();

        $form = $this->newForm($gite);

        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($gite);
            $em->flush();

            return $this->redirect($this->generateUrl('gite_listview'));

        }
        return array(
            'formulaire_gite' => $form->createView(),
        );
    }

    /**
     * @Template("GiteBundle:Gite:view.html.twig")
     */
    public function preReservationAction(Request $request)
    {
        $defaultData = array('message' => 'Type your message here');
        $form = $this->createFormBuilder($defaultData)
            ->add('arrival', 'datetime')
            ->add('departure', 'datetime')
            ->add('send', 'submit')
            ->getForm();

        $form->handleRequest($request);

        if ($form->isValid()) {
            $data = $form->getData();
        }
        return array(
            'pre_resa' => $form->createView($data),
        );
    }

    private function newForm($gite)
    {
        return $form = $this->createForm(
            new GiteType(),
            $gite,
            array()
        );
    }
}
