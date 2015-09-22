<?php

namespace Gite\GalerieBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use Symfony\Component\HttpFoundation\Request;
use Gite\GalerieBundle\Entity\Image;
use Gite\GalerieBundle\Form\ImageType;

class ImageController extends Controller
{
    /**
     * Creates a form to create a Image entity.
     *
     * @param Image $entity The entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createCreateForm(Image $entity)
    {
        $form = $this->createForm(new ImageType(), $entity, array(
            'action' => $this->generateUrl('new_image'),
            'method' => 'POST',
        ));

        $form->add('submit', 'submit', array('label' => 'Create'));

        return $form;
    }

    public function newImageAction()
    {
        $entity = new Image();

        $form = $this->createFormBuilder($entity)
            ->add('alt')
            ->add('url')
            ->getForm();

        if ($this->getRequest()->isMethod('POST')) {
            $form->handleRequest($this->getRequest());
            if ($form->isValid()) {
                $em = $this->getDoctrine()->getManager();
                $em->persist($entity);
                $em->flush();

                return $this->redirect($this->generateUrl('galerie_edit', array('id' => $entity->getId())));
            }
        }

        return $this->render('GalerieBundle:Image:new.html.twig', array(
            'entity' => $entity,
            'form_image' => $form->createView(),
        ));
    }
}
