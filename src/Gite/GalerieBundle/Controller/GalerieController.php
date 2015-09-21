<?php

namespace Gite\GalerieBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Gite\GalerieBundle\Entity\Galerie;
use Gite\GalerieBundle\Form\GalerieType;
use Gite\GiteBundle\Form\GiteType;

class GalerieController extends Controller
{
    public function indexAction()
    {
        return $this->render('GalerieBundle:Default:index.html.twig');
    }

    /**
     * Creates a form to create a Galerie entity.
     *
     * @param Galerie $entity The entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createCreateForm(Galerie $entity)
    {
        $form = $this->createForm(new GalerieType(), $entity, array(
            'action' => $this->generateUrl('new_galerie'),
            'method' => 'POST',
        ));

        $form->add('submit', 'submit', array('label' => 'Create'));

        return $form;
    }

    /**
     * Displays a form to create a new Galerie entity.
     */
    public function editGalerieAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();
        $gite = $em->getRepository('GiteBundle:Gite')->find($id);

        // $gite = $repo->findOneById($id);

        $galerie = $gite->getGalerie();
        if (!$galerie) {
            throw $this->createNotFoundException('Unable to find Gallery entity.');
        }

        $editForm = $this->createEditForm($galerie, $id);

        $editForm->handleRequest($request);

        if ($editForm->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($galerie);
            $em->flush();

            // return $this->redirect($this->generateUrl('gite_show', array('id' => $entity->getId())));
        }

        return $this->render('GalerieBundle:Galerie:edit.html.twig', array(
            'entity' => $galerie,
            'galerie' => $galerie,
            'form' => $editForm->createView(),
        ));
    }

    private function createEditForm(Galerie $entity, $id)
    {
        $form = $this->createForm(new GalerieType(), $entity, array(
            'action' => $this->generateUrl('galerie_edit', array('id' => $id)),
            'method' => 'POST',
        ));

        $form->add('submit', 'submit', array('label' => 'Update'));

        return $form;
    }
}
