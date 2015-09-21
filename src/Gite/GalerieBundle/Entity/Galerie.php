<?php

namespace Gite\GalerieBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
/**
 * Galerie
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Gite\GalerieBundle\Entity\GalerieRepository")
 */
class Galerie
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;

    /**
     * @ORM\OneToMany(targetEntity="Gite\GalerieBundle\Entity\Image", mappedBy="galerie", cascade={"persist"})
     */
    private $images;

    public function __construct(){
        $this->images = new ArrayCollection();
    }



    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return Post
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Add images
     *
     * @param \Gite\GalerieBundle\Entity\Image $images
     * @return Galerie
     */
    public function addImage(\Gite\GalerieBundle\Entity\Image $images)
    {
        $this->images[] = $images;

        return $this;
    }

    /**
     * Remove images
     *
     * @param \Gite\GalerieBundle\Entity\Image $images
     */
    public function removeImage(\Gite\GalerieBundle\Entity\Image $images)
    {
        $this->images->removeElement($images);
    }

    /**
     * Get images
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getImages()
    {
        return $this->images;
    }
}
