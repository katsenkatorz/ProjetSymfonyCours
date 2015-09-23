<?php

namespace Gite\GalerieBundle\Controller;

use Gite\GalerieBundle\Entity\Image;
use Gite\GalerieBundle\Form\ImageType;
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

        // Galerie
        $galerie = $gite->getGalerie();
        if (!$galerie) {
            throw $this->createNotFoundException('Unable to find Gallery entity.');
        }

        $galleryForm = $this->createForm(new GalerieType(), $galerie, array(
            'action' => $this->generateUrl('galerie_edit', array('id' => $id)),
            'method' => 'POST',
        ));
        $galleryForm->handleRequest($request);
        if ($galleryForm->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($galerie);
            $em->flush();
        }
        
        // Image
        $image = new Image();
        $imageForm = $this->createForm(new ImageType(), $image, array(
            'action' => $this->generateUrl('galerie_edit', array('id' => $id)),
            'method' => 'POST',
        ));
        $imageForm->handleRequest($request);
        if ($imageForm->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $image->setGalerie($galerie);
            $image->upload();
            $em->persist($image);
            $em->flush();
        }

        return $this->render('GalerieBundle:Galerie:edit.html.twig', array(
            'entity' => $galerie,
            'galerie' => $galerie,
            'galleryForm' => $galleryForm->createView(),
            'imageForm' => $imageForm->createView(),
        ));
    }
}
