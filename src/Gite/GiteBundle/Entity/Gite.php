<?php

namespace Gite\GiteBundle\Entity;

use Gite\GalerieBundle\Entity\Galerie;
use Doctrine\ORM\Mapping as ORM;

/**
 * Gite
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Gite\GiteBundle\Entity\GiteRepository")
 */
class Gite
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
     * @var string
     *
     * @ORM\Column(name="content", type="string", length=255)
     */
    private $content;

    /**
     * @var string
     *
     * @ORM\Column(name="options", type="string", length=255)
     */
    private $options;

    /**
     * @var float
     *
     * @ORM\Column(name="prix", type="float")
     */
    private $prix;

    /**
     * @ORM\OneToOne(targetEntity="Gite\GalerieBundle\Entity\Galerie", cascade="persist")
     */
    private $galerie;

    public function __construct(){
        $gal = $this->galerie = new Galerie();
        $gal->setName(time());
    }

    public function __toString()
    {
        return $this->name;
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
     * Set content
     *
     * @param string $content
     * @return Post
     */
    public function setContent($content)
    {
        $this->content = $content;

        return $this;
    }

    /**
     * Get content
     *
     * @return string
     */
    public function getContent()
    {
        return $this->content;
    }

    /**
     * Set options
     *
     * @param string $options
     * @return Post
     */
    public function setOptions($options)
    {
        $this->options = $options;

        return $this;
    }

    /**
     * Get options
     *
     * @return string
     */
    public function getOptions()
    {
        return $this->options;
    }

    /**
     * Set galerie
     *
     * @param \Gite\GalerieBundle\Entity\Galerie $galerie
     * @return Gite
     */
    public function setGalerie(\Gite\GalerieBundle\Entity\Galerie $galerie = null)
    {
        $this->galerie = $galerie;

        return $this;
    }

    /**
     * Get galerie
     *
     * @return \Gite\GalerieBundle\Entity\Galerie
     */
    public function getGalerie()
    {
        return $this->galerie;
    }

    /**
     * Set prix
     *
     * @param float $prix
     * @return Gite
     */
    public function setPrix($prix)
    {
        $this->prix = $prix;

        return $this;
    }

    /**
     * Get prix
     *
     * @return float 
     */
    public function getPrix()
    {
        return $this->prix;
    }
}
