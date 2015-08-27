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

        return $this->render('GiteBundle:ModuleUsed:listgite.html.twig', array('gites' => $gites));

    }

    /**
     * @Template("GiteBundle:Gite:new.html.twig")
     */
    public function newGiteAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $gite = new Gite();
        /*$formBuilder = $this->get('form.factory')->createBuilder('form', $gite);
        $formBuilder
            ->add('name', 'text')
            ->add('content', 'textarea')
            ->add('options', 'text')
            ->add('Creer gite', 'submit');

        $form = $formBuilder->getForm();
*/
        $form=$this->createForm(
            new GiteType(),
            $gite,
            array()
        );
        $form->handleRequest($request);
        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($gite);
            $em->flush();

            return $this->redirect($this->generateUrl('create_gite'));

        }
        return array(
            'formulaire_gite' => $form->createView(),
        );
    }
}
