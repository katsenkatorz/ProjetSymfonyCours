

function setCalendrierForResa(divForCalend, ident, typeGite, tabChambre, langue, modeAff, nbMois) {
    var today = new OBJDate();
    today.definition();
    var moisCurr = $("mois").value;
    if (moisCurr == 0)moisCurr = today.getMois();
    if (parseInt(moisCurr, 10) < 10 && moisCurr.substr(0, 1) == "0")moisCurr = moisCurr.substr(1, 1);
    var anneeCurr = $("annee").value;
    if (anneeCurr == 0)anneeCurr = today.getAnnee();
    var fctClic = function (evt, jour, mois, annee, etat) {
        if (parseInt(jour, 10) < 10 && jour.substr(0, 1) == "0")jour = jour.substr(1, 1);
        $("jour").value = jour;
        $("mois").value = mois;
        $("annee").value = annee;
        Effect.BlindUp(divForCalend);
        $(divForCalend).showing = false;
        if (verifSaisieDatesLocation() === false) {
            setHTMLById("div_msgClient_dateSejour", $("id_msgPasDates").value);
            $("div_msgClient_dateSejour").addClassName("msgClientAffiche");
            if ("div_saisieDatesSejour")effaceEtapesApres("div_saisieDatesSejour");
        }
    };
    if (!typeGite && tabChambre && tabChambre.length > 0)typeGite = "H";
    if (!typeGite)typeGite = "G";
    if (!tabChambre)tabChambre = new Array();
    setCalendrierToDiv(divForCalend, {
        "langue": langue,
        "moisDebut": moisCurr,
        "anneeDebut": anneeCurr,
        "firstWeekDay": 2,
        "nbMois": nbMois,
        "ident": ident,
        "typeGite": typeGite,
        "tabChambre": tabChambre,
        "afficheJrArrivee": true,
        "afficheDispos": true,
        "duree": $("duree").value,
        "clic": fctClic,
        "modeAff": modeAff
    });
}
function setCalendrierForResaGP(divForCalend, code, typeProd, langue, modeAff, nbMois, tabStock, instance, request) {
    var today = new OBJDate();
    today.definition();
    var moisCurr = $("mois").value;
    if (moisCurr == 0)moisCurr = today.getMois();
    if (parseInt(moisCurr, 10) < 10 && moisCurr.substr(0, 1) == "0")moisCurr = moisCurr.substr(1, 1);
    var anneeCurr = $("annee").value;
    if (anneeCurr == 0)anneeCurr = today.getAnnee();
    if ($("duree"))var duree = $("duree").value; else var duree = 1;
    if (!tabStock)tabStock = {};
    var fctClic = function (evt, jour, mois, annee, etat) {
        $("jour").value = jour;
        $("mois").value = mois;
        $("annee").value = annee;
        Effect.BlindUp(divForCalend);
        $(divForCalend).showing = false;
        if (verifSaisieDatesSejourGP() === false) {
            setHTMLById("div_msgClient_dateSejour", $("id_msgPasDates").value);
            $("div_msgClient_dateSejour").addClassName("msgClientAffiche");
            if ("div_saisieDatesSejour")effaceEtapesApresGP("div_saisieDatesSejour");
        }
    };
    setCalendrierToDivGP(divForCalend, {
        "langue": langue,
        "moisDebut": moisCurr,
        "anneeDebut": anneeCurr,
        "firstWeekDay": 2,
        "nbMois": nbMois,
        "code": code,
        "instance": instance,
        "typeProd": typeProd,
        "tabStock": tabStock,
        "request": request,
        "afficheJrArrivee": true,
        "afficheDispos": true,
        "duree": duree,
        "clic": fctClic
    });
}
function setCalendrierToDivForDispoProd(nomdiv, ident, tabStock, nbMois, request, typeProd, linkToResa) {
    if (!$(nomdiv).showing) {
        var fctClic = function (evt, jour, mois, annee, etat) {
            Effect.BlindUp(nomdiv);
            $(nomdiv).showing = false;
            if (linkToResa)document.location.href = linkToResa + "&jour_calend=" + jour + "&mois_calend=" + mois + "&annee_calend=" + annee;
        };
        $(nomdiv).hide();
        if (!nbMois)nbMois = 3;
        ident = new String(ident);
        var tabInfos = ident.split(".");
        var instance = tabInfos[0];
        var code = tabInfos[2];
        setCalendrierToDivGP(nomdiv, {
            "firstWeekDay": 1,
            "nbMois": nbMois,
            "code": code,
            "instance": instance,
            "typeProd": typeProd,
            "tabStock": tabStock,
            "request": request,
            "afficheJrArrivee": true,
            "afficheDispos": true,
            "clic": fctClic
        });
        Effect.BlindDown(nomdiv, {duration: 0.5});
        $(nomdiv).showing = true;
        $(nomdiv).addClassName("div_dispos_showing");
    } else {
        Effect.BlindUp(nomdiv);
        $(nomdiv).showing = false;
        $(nomdiv).removeClassName("div_dispos_showing");
    }
}
function setCalendrierForRecherche(instance, idf, ident, langue, typeGite) {
    var today = new OBJDate();
    today.definition();
    var moisCurr = $("mois").value;
    if (moisCurr == 0)moisCurr = today.getMois();
    if (parseInt(moisCurr, 10) < 10 && moisCurr.substr(0, 1) == "0")moisCurr = moisCurr.substr(1, 1);
    var anneeCurr = $("annee").value;
    if (anneeCurr == 0)anneeCurr = today.getAnnee();
    if (!typeGite)typeGite = "G";
    var fctClic = function (evt, jour, mois, annee, etat) {
        if (parseInt(jour, 10) < 10 && jour.substr(0, 1) == "0")jour = jour.substr(1, 1);
        $("jour").value = jour;
        $("mois").value = mois;
        $("annee").value = annee;
        $("calendrierRecherche").style.display = "none";
    };
    setCalendrierToDiv("calendrierRecherche", {
        "langue": langue,
        "moisDebut": moisCurr,
        "anneeDebut": anneeCurr,
        "firstWeekDay": 2,
        "nbMois": 1,
        "ident": ident,
        "instance": instance,
        "id_famille": idf,
        "afficheJrArrivee": true,
        "afficheDispos": true,
        "typeGite": typeGite,
        "duree": $("duree").value,
        "clic": fctClic
    });
}
function setCalendrierGeneral(instance, idf, langue, typeGite, idDivCalend, fctClic, idDate, idMois, idAnnee, idDuree, nbMois, firstWeekDay, jrEnAvant, dateDebSej, nbjSej, fcQdFini) {
    var today = new OBJDate();
    today.definition();
    var moisCurr = 0;
    var anneeCurr = 0;
    if (idDate && $(idDate) && $(idDate).value != $(idDate).getAttribute("data-defaut")) {
        var dateCurr = new OBJDate();
        dateCurr.definition($(idDate).value);
        moisCurr = dateCurr.getMois();
        anneeCurr = dateCurr.getAnnee();
    } else {
        if (idMois && $(idMois) && idAnnee && $(idAnnee)) {
            moisCurr = $(idMois).value;
            anneeCurr = $(idAnnee).value;
        }
    }
    if (idDuree && $(idDuree))duree = $(idDuree).value;
    if (moisCurr == 0)moisCurr = today.getMois();
    if (parseInt(moisCurr, 10) < 10 && moisCurr.substr(0, 1) == "0")moisCurr = moisCurr.substr(1, 1);
    if (anneeCurr == 0)anneeCurr = today.getAnnee();
    if (!typeGite)typeGite = "G";
    if (!nbMois)nbMois = "1";
    if (!firstWeekDay)firstWeekDay = "2";
    if (!duree && typeGite == "G")var duree = "7";
    if (!duree)var duree = "1";
    if (!jrEnAvant)var jrEnAvant = 0;
    if (!dateDebSej)nbjSej = null;
    setCalendrierToDiv(idDivCalend, {
        "langue": langue,
        "moisDebut": moisCurr,
        "anneeDebut": anneeCurr,
        "firstWeekDay": firstWeekDay,
        "nbMois": nbMois,
        "instance": instance,
        "id_famille": idf,
        "afficheJrArrivee": true,
        "afficheDispos": true,
        "typeGite": typeGite,
        "duree": duree,
        "clic": fctClic,
        "jrEnAvant": jrEnAvant,
        "dateDebSej": dateDebSej,
        "nbjSej": nbjSej,
        "fcQdFini": fcQdFini
    });
}
function setCalendrierToDivForDispoStruct(nomdiv, ident, tabChambre, linkToResa, nbMois, modeVenteGeGs, afficheDisposParAnnee, tabAnneesActives, reference, afficheNavChambre, langue, cliquable, afficheLegende, modeAff) {
    if (!$(nomdiv).showing) {
        var fctClic;
        if ('function' == typeof(clickSurJourDsPlanningFiche))fctClic = window.clickSurJourDsPlanningFiche; else {
        }
        $(nomdiv).hide();
        if (!nbMois)nbMois = 3;
        setCalendrierToDiv(nomdiv, {
            'duree': '0',
            'firstWeekDay': 1,
            'nbMois': nbMois,
            'ident': ident,
            'afficheJrArrivee': false,
            'afficheDispos': true,
            "tabChambre": tabChambre,
            "clic": fctClic,
            "modeVenteGeGs": modeVenteGeGs,
            "afficheDisposParAnnee": afficheDisposParAnnee,
            "linkToResa": linkToResa,
            "langue": langue,
            "reference": reference,
            "afficheNavChambre": afficheNavChambre,
            "tabAnneesActives": tabAnneesActives,
            "nonCliquable": cliquable,
            "afficheLegende": afficheLegende,
            "modeAff": modeAff
        });
        Effect.BlindDown(nomdiv, {duration: 0.5});
        $(nomdiv).showing = true;
        $(nomdiv).addClassName("div_dispos_showing");
    } else {
        Effect.BlindUp(nomdiv, {duration: 0.5});
        $(nomdiv).showing = false;
        $(nomdiv).removeClassName("div_dispos_showing");
    }
}
function initPlanning(nomdiv, titreDivResa, afficheDisposParAnnee, afficheNavChambre, afficheLegende) {
    if (jQuery(".div_fiche_calendrierDispoPHP").length == 0) {
        if ($(nomdiv)) {
            var obj = $(nomdiv);
            var ident = obj.getAttribute("ident");
            var nbMois = obj.getAttribute("nbMois");
            var langue = obj.getAttribute("langue");
            var nonCliquable = obj.getAttribute('noncliquable');
            var tabChambre;
            if (!obj.getAttribute("tabChambre"))tabChambre = new Array(); else tabChambre = eval(obj.getAttribute("tabChambre"));
            var linkToResa = obj.getAttribute("linkToResa");
            var modeVenteGeGs = obj.getAttribute("modeVenteGeGs");
            var afficheLegende = eval(afficheLegende);
            var tabAnneesActives;
            if (!obj.getAttribute("tabAnneesActives"))tabAnneesActives = new Array(); else tabAnneesActives = eval(obj.getAttribute("tabAnneesActives"));
            var reference = obj.getAttribute("reference");
            if (titreDivResa)window.nomDivResaPopIn = titreDivResa;
            setCalendrierToDivForDispoStruct(nomdiv, ident, tabChambre, linkToResa, nbMois, modeVenteGeGs, afficheDisposParAnnee, tabAnneesActives, reference, afficheNavChambre, langue, nonCliquable, afficheLegende);
            var idDivGene = obj.getAttribute("idDivGene");
            if (idDivGene)setActionsSurListeChambres(tabChambre, ident, linkToResa, nbMois, modeVenteGeGs, idDivGene); else setActionsSurListeChambres(tabChambre, ident, linkToResa, nbMois, modeVenteGeGs);
        }
    } else {
    }
}
function setActionsSurListeChambres(tabChambre, ident, linkToResa, nbMois, modeVenteGeGs, idDivGene) {
    if (tabChambre.length > 0) {
        var objGraph = $("divGraph_fenetre");
        if (objGraph)var styleDivGraph = objGraph.style.display; else var styleDivGraph = null;
        if ($("select_fiche_dispos_fngf_v4_chmbAnnee") && styleDivGraph != "none")var id = "select_fiche_dispos_fngf_v4_chmbAnnee"; else var id = "select_fiche_dispos_fngf_v4_chmb";
        var objId = $(id);
        if (objId) {
            objId.onchange = function (evt) {
                if (!idDivGene) {
                    var idDivGeneForSetClasse = this.nextSibling.firstChild.firstChild.childNodes[1].firstChild.getAttribute("idDivGene");
                }
                else var idDivGeneForSetClasse = idDivGene;
                if (this.value == "G") {
                    calendrier_setClasseForDispos(idDivGeneForSetClasse);
                    calendrier_setClasseForJourArr(idDivGeneForSetClasse);
                }
                else calendrier_setClasseForDisposForChambre(idDivGeneForSetClasse, tabChambre.length);
            }
        }
    }
}
function calendrier_getXHTMLForAfficheInDivAvecTransparenceAvecChargChambres(nomdiv, ident, linkToResa, nbMois, modeVenteGeGs, afficheDisposParAnnee, tabAnneesActives, obj, reference, titreDivResa, langue, duree, afficheLegende) {
    var url = "/lib_2/ajax/infosDist.php";
    var vars;
    var html_calend;
    vars = "info=TABCHB&ident=" + ident;
    var xhr_local = creeObjHttpRequest();
    xhr_local.onreadystatechange = function () {
        if (xhr_local.readyState == 4 && xhr_local.status == 200) {
            var contenu = xhr_local.responseText;
            var tabChambre = eval(contenu);
            html_calend = calendrier_getXHTMLForAfficheInDivAvecTransparence(nomdiv, ident, tabChambre, linkToResa, nbMois, modeVenteGeGs, afficheDisposParAnnee, tabAnneesActives, reference, titreDivResa, langue, duree, afficheLegende);
            $("divGraph_fenetre").innerHTML = html_calend;
        }
    }
    xhr_local.open("POST", url, true);
    xhr_local.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr_local.send(vars);
}
function calendrier_getXHTMLForAfficheInDivAvecTransparence(nomdiv, ident, tabChambre, linkToResa, nbMois, modeVenteGeGs, afficheDisposParAnnee, tabAnneesActives, reference, titreDivResa, langue, duree, afficheLegende) {
    var fctClic = calendrier_redirectFrmToResa;
    var html;
    window.nomDivResaPopIn = titreDivResa;
    html = "<div class='calendIteaBtFermer' id='div_planningBtFermer_calendItea_" + nomdiv + "' onclick=effaceDivAvecTransparence();>Fermer</div>";
    html += setCalendrierToDiv(nomdiv, {
        'moisDebut': 1,
        'firstWeekDay': 1,
        'nePasChargerMotCles': true,
        'nbMois': nbMois,
        'ident': ident,
        'afficheJrArrivee': false,
        'afficheDispos': true,
        "tabChambre": tabChambre,
        "clic": fctClic,
        "modeVenteGeGs": modeVenteGeGs,
        "afficheDisposParAnnee": afficheDisposParAnnee,
        "tabAnneesActives": tabAnneesActives,
        "linkToResa": linkToResa,
        "reference": reference,
        "langue": langue,
        "duree": duree,
        "afficheLegende": afficheLegende
    }, true);
    return html;
}
function calendrier_redirectFrmToResa(linkToResa, sending, width, height) {
    if (!sending)sending = "";
    window.popupReservation = window.open(linkToResa + "?" + sending, "blank");
}
function setActionsApresChargementDispo(nomdiv, ident, obj, afficheLegende) {
    if (obj) {
        $$('.div_planningSelect').each(function (elt) {
            elt.removeClassName('div_planningSelect');
        })
        if (obj.getAttribute("data-indice")) {
            var indice = obj.getAttribute("data-indice");
        }
        else {
            var indice = obj.getAttribute("indice");
        }
        var idListe = "liLst_elem_" + indice;
        if ($(idListe)) {
            $(idListe).addClassName("div_planningSelect");
        }
    }
    if (afficheLegende == true) {
        calendrier_chargeMotCleDeLaLegende(nomdiv);
    }
    var idDivForChargeMotCle = "calendItea_" + nomdiv;
    calendrier_chargeMotCleDansCalendrier(idDivForChargeMotCle);
    ident = new String(ident);
    var tabInfos = ident.split(".");
    var typeProd = tabInfos[3];
    if (typeProd == "G" || typeProd == "H")setActionsSurMois(ident);
}
function setCalendrierToDiv(idDiv, params, getXHTML) {
    if (!params.typeGite && params.tabChambre && params.tabChambre.length > 0 && params.modeVenteGeGs != "G")params.typeGite = "H";
    if (!params.typeGite)params.typeGite = "G";
    if (!params.tabChambre)params.tabChambre = new Array();
    if (!params.langue)params.langue = "FRANCAIS";
    if (!params.modeAff)params.modeAff = "CARRE";
    if (!params.afficheNavChambre)params.afficheNavChambre = false;
    if (params.modeVenteGeGs == "?") {
        if (params.modeAff == "LIGNE")params.typeGite = "H"; else params.typeGite = "G";
    }
    if (!params.tabAnneesActives)params.tabAnneesActives = new Array();
    var html = "";
    div = $(idDiv);
    if (div) {
        var changeAff = "";
        if ((params.typeGite == "H" || params.modeVenteGeGs == "H" || params.modeVenteGeGs == "?") && params.ident) {
            var affSelect;
            if (params.modeAff == "LIGNE")affSelect = "CARRE"; else affSelect = "LIGNE";
            changeAff = "<p class='saisieDatesSejour changeModeAffCalendrier' id='saisieDatesSejour_changeAff_" + idDiv + "'></p>";
        }
        if (getXHTML)html += calendrier_getXHTML(params, idDiv, true) + changeAff; else {
            if (params.afficheDisposParAnnee == "true")div.innerHTML = calendrier_getXHTML(params, idDiv, true) + changeAff; else div.innerHTML = calendrier_getXHTML(params, idDiv) + changeAff;
        }
        if (!params.nePasChargerMotCles && params.afficheLegende)calendrier_chargeMotCleDeLaLegende(idDiv);
        if (!params.ident && (params.typeGite == "H" || !params.instance))calendrier_setClasseForJourArrTous("calendItea_" + idDiv); else affMsgAttenteParDessusInDiv(idDiv);
        if ((params.typeGite == "H" || params.modeVenteGeGs == "H" || params.modeVenteGeGs == "?") && $("saisieDatesSejour_changeAff_" + idDiv)) {
            if (!params.nePasChargerMotCles) {
                if (params.modeVenteGeGs == "?")chargeMotCleDsDiv("saisieDatesSejour_changeAff_" + idDiv, "LBL_AFFCALENDGEGSINCONNU_" + affSelect); else chargeMotCleDsDiv("saisieDatesSejour_changeAff_" + idDiv, "LBL_AFFCALEND_" + affSelect);
            }
            else {
                var txt = "";
                if (params.modeVenteGeGs == "?") {
                    if (affSelect == "CARRE")txt = "Disponibilit&eacute;s de l'h&eacute;bergement complet"; else txt = "Disponibilit&eacute;s par chambre";
                }
                else {
                    if (affSelect == "CARRE")txt = "Affichage cumul&eacute;"; else txt = "Affichage &agrave; la chambre";
                }
                if (getXHTML)html += txt; else $("saisieDatesSejour_changeAff_" + idDiv).innerHTML = txt;
            }
            $("saisieDatesSejour_changeAff_" + idDiv).onclick = function (evt) {
                params.modeAff = affSelect;
                setCalendrierToDiv(idDiv, params);
            }
        }
        div.firstChild.foncQdClicGauche = params.clic;
        div.firstChild.foncQdChangeMois = params.foncQdChangeMois;
    }
    if (params.fcQdFini)params.fcQdFini();
    if (getXHTML)return html;
}
function calendrier_getXHTML_Navig(params) {
    var htmlNavig = "";
    var html = "<div class='calendIteaDivNavig'>";
    var nextMonth = "{'nbMois':" + params.nbMois + ",'mois':" + parseInt(params.moisDebut + 1) + ",'annee':" + params.annee + ",'firstWeekDay':" + params.firstWeekDay + "}";
    html += "</div>"
}
function calendrier_getXHTML(params, idDiv, calendAvecSaison) {
    var html = "";
    if (params.nbMois)nbMois = params.nbMois; else nbMois = 1;
    var today = new OBJDate();
    today.definition();
    if (!params.moisDebut)params.moisDebut = today.getMois();
    if (!params.anneeDebut)params.anneeDebut = today.getAnnee();
    var mois = params.moisDebut;
    var annee = params.anneeDebut;
    if (params.afficheDisposParAnnee == "true") {
        var mois = 1;
        if (today.getAnnee() == annee)nbMois = 12 - mois + 1; else nbMois = 12;
        var nb_annees = params.tabAnneesActives.length;
        var annee_prec = 0;
        var annee_suiv = 0;
        var annee_min = 0;
        if (annee_min <= today.getAnnee())annee_min = today.getAnnee(); else annee_min = params.tabAnneesActives[0];
        var annee_max = params.tabAnneesActives[nb_annees - 1];
        if (annee < annee_max && annee > annee_min) {
            annee_prec = annee - 1;
            annee_suiv = annee - 1;
        }
        else if (annee == annee_min)
            if (annee_max != annee_min)annee_suiv = parseInt(annee) + 1; else if (annee == annee_max)
                if (annee_min != annee_max)annee_prec = parseInt(annee) - 1;
    }
    var langue = params.langue;
    if (!langue)langue = "FRANCAIS";
    var typeGite = params.typeGite;
    if (!typeGite)typeGite = "G";
    var nb_chambre = params.tabChambre.length;
    var classeAlternee;
    if (params.ident)var ident = params.ident; else var ident = "";
    if (params.instance)var instance = params.instance; else var instance = "";
    if (params.linkToResa)var linkToResa = params.linkToResa; else var linkToResa = "";
    if (calendAvecSaison)html = "<div class='calendIteaAvSaison' id='calendItea_" + idDiv + "' ident='" + ident + "' linkToResa='" + linkToResa + "'>"; else html = "<div class='calendItea calendItea_" + params.modeAff + "' id='calendItea_" + idDiv + "' ident='" + ident + "' linkToResa='" + linkToResa + "'>";
    if ((params.afficheDisposParAnnee || params.afficheNavChambre == true) && (typeGite == "H" || params.modeVenteGeGs == "?")) {
        if (nb_chambre > 1) {
            html += "<select class='fiche_dispos_fngf_v4_chmb' id='select_fiche_dispos_fngf_v4_chmbAnnee'>";
            if (params.modeVenteGeGs == "?")
                html += "<option value='G' class='fiche_dispos_fngf_v4_chmb' id='option_dispo_chmb_G'>A la structure</option>";
            if (params.langue == "ANGLAIS")html += "<option value='0' class='fiche_dispos_fngf_v4_chmb' id='option_dispo_chmb_0'>All rooms</option>"; else html += "<option value='0' class='fiche_dispos_fngf_v4_chmb' id='option_dispo_chmb_0'>Toutes les chambres</option>";
            for (var j = 0; j < nb_chambre; j++) {
                html += "<option value='" + params.tabChambre[j].numero_chambre + "' class='fiche_dispos_fngf_v4_chmb' id='option_dispo_chmb_" + params.tabChambre[j].numero_chambre + "'>" + params.tabChambre[j].nom + "</option>";
            }
            html += "</select>";
        }
    }
    html += "<div class='calendItea_navigEtCalend'>";
    html += "<div class='calendItea_navig calendItea_navigGauche' id='calendIteaNavigGauche_calendItea_" + idDiv + "'>";
    var displayNavigCalendrierdebut = 'block';
    if (mois == today.getMois() && annee == today.getAnnee())displayNavigCalendrierdebut = 'none';
    if (!params.afficheDisposParAnnee) {
        html += "<a style='display:" + displayNavigCalendrierdebut + ";' data-anneMin='" + today.getAnnee() + "' data-moisMin='" + today.getMois() + "' onclick=calendrier_moisAutre(this.parentNode.nextSibling.firstChild,-1)>";
        html += "<";
        html += "</a>";
    }
    else {
        if (annee_prec != 0) {
            html += "<a style='display:" + displayNavigCalendrierdebut + ";' data-anneMin='" + today.getAnnee() + "' data-moisMin='" + today.getMois() + "' class='calendItea_navigGauche_lien' href='#dispoPrecedent' onclick=calendrier_moisAutre(this.parentNode.nextSibling.nextSibling.nextSibling.firstChild,-1)>";
            html += "<span id='lblDisponibilitesNavigGauche_calendItea_" + idDiv + "'></span>&nbsp;";
            html += "<span id='valDisponibilitesNavigGauche_calendItea_" + idDiv + "'>" + annee_prec + "</span>";
            html += "</a>";
        }
    }
    html += "</div>";
    if (params.afficheDisposParAnnee == "true") {
        var identForRef = new String(ident);
        var tabInfos = identForRef.split(".");
        var numHeber = tabInfos[2];
        if (params.reference)numHeber = params.reference;
        html += "<div class='calendItea_navig calendItea_anneeCourante'>";
        html += "<span id='lblDisponibilitesRefInterne_calendItea_" + idDiv + "'></span>&nbsp;";
        html += "<span id='disponibilitesRefInterne_calendItea_" + idDiv + "'>" + numHeber + "</span>&nbsp;";
        html += "<span id='lblDisponibilitesAnneeCourante_calendItea_" + idDiv + "'></span>&nbsp;";
        html += "<span id='valDisponibilitesAnneeCourante_calendItea_" + idDiv + "'>" + annee + "</span>";
        html += "</div>";
    }
    if (params.afficheDisposParAnnee == "true") {
        html += "<div class='calendItea_navig calendItea_navigDroite' id='calendIteaNavigDroite_calendItea_" + idDiv + "'>";
        if (annee_suiv != 0) {
            html += "<a class='calendItea_navigDroite_lien' href='#dispoSuivant' onclick=calendrier_moisAutre(this.parentNode.nextSibling.firstChild,1)>";
            html += "<span id='lblDisponibilitesNavigDroite_calendItea_" + idDiv + "'></span>&nbsp;";
            html += "<span id='valDisponibilitesNavigDroite_calendItea_" + idDiv + "'>" + annee_suiv + "</span>";
            html += "</a>";
        }
        html += "</div>";
    }
    html += "<div class=calendItea_listMois>";
    html += "<ul id='ul_calendItea_" + idDiv + "' class='itea_ul calendItea_ul calendItea_ul_" + params.modeAff + "' moisDeb='" + mois + "' annee='" + annee + "' nbMois='" + nbMois + "' firstWeekDay='" + params.firstWeekDay + "' idDivGene='calendItea_" + idDiv + "' typeGite='" + typeGite + "' nb_chambre='" + nb_chambre + "' langue='" + langue + "' modeAff='" + params.modeAff + "' ident='" + ident + "' instance='" + instance + "' afficheDisposParAnnee='" + params.afficheDisposParAnnee + "' annee_min='" + annee_min + "' annee_max='" + annee_max + "' jrEnAvant='" + params.jrEnAvant + "' dateDebSej='" + params.dateDebSej + "' nbjSej='" + params.nbjSej + "' nonCliquable='" + params.nonCliquable + "' >";
    moisCurr = mois;
    anneeCurr = annee;
    for (var i = 0; i < nbMois; i++) {
        if (i % 2 == 0)classeAlternee = "calendItea_liPaire"; else classeAlternee = "calendItea_liImpaire";
        if (moisCurr < today.getMois() && anneeCurr <= today.getAnnee())classeInit = "moisNonInit"; else classeInit = "";
        html += "<li class='calendItea_li " + classeAlternee + " " + classeInit + "'>";
        params.moisCurr = moisCurr;
        params.anneeCurr = anneeCurr;
        params.nb_chambre = nb_chambre;
        if (params.modeAff == "LIGNE")
            html += calendrier_getXHTML_1moisLineaire(params, "calendItea_" + idDiv); else html += calendrier_getXHTML_1mois(params, "calendItea_" + idDiv);
        html += "</li>";
        moisCurr++;
        if (moisCurr > 12) {
            moisCurr = 1;
            anneeCurr++;
        }
    }
    html += "</ul>";
    html += "</div>";
    if (!params.afficheDisposParAnnee) {
        html += "<div class='calendItea_navig calendItea_navigDroite'>";
        html += "<a onclick=calendrier_moisAutre(this.parentNode.previousSibling.firstChild,1)>";
        html += ">";
        html += "</a>";
        html += "</div>";
    }
    html += "</div>";
    if (params.ident && params.afficheLegende == true) {
        html += "<div class='calendItea_legende'>";
        html += "<ul class='itea_ul ul_legendeCalend'>";
        html += "<li class='calendItea_li_legende' id='li_legende_cliquable'>";
        html += "<span class='spanCalendVisuel spanCalendCliquable'>1</span><span class='spanCalendLibelle definition_legendeCalendCliquable' id='legendeCliquable_" + idDiv + "'></span>";
        html += "</li>";
        if (typeGite != "H") {
            html += "<li class='calendItea_li_legende' id='li_legende_libre'>";
            html += "<span class='spanCalendVisuel spanCalendJour_libre'>1</span><span class='spanCalendLibelle definition_legendeCalendLibre' id='legendeLibre_" + idDiv + "'></span>";
            html += "</li>";
        }
        html += "<li class='calendItea_li_legende' id='li_legende_sejour'>";
        html += "<span class='spanCalendVisuel spanDateSejourSelect'>1</span><span class='spanCalendLibelle definition_legendeCalendSejourSelect' id='legendeSelect_" + idDiv + "'></span>";
        html += "</li>";
        html += "<li class='calendItea_li_legende' id='li_legende_occupe'>";
        html += "<span class='spanCalendVisuel spanCalendJour_occupe'>1</span><span class='spanCalendLibelle definition_legendeCalendSejourOccupe' id='legendeOccupe_" + idDiv + "'></span>";
        html += "</li>";
        html += "<li class='calendItea_li_legende' id='li_legende_contact'>";
        html += "<span class='spanCalendVisuel spanCalendJour_contact'>1</span><span class='spanCalendLibOu' id='legendeContactOu_" + idDiv + "'></span><span class='spanCalendVisuel spanCalendJour_inconnu'>1</span><span class='spanCalendLibelle definition_legendeCalendSejourContactProp' id='legendeContact_" + idDiv + "'></span>";
        html += "</li>";
        if (params.modeVenteGeGs == "?") {
            html += "<li class='calendItea_li_legende' id='li_legende_gegs_mode_vente'>";
            html += "<span class='spanCalendVisuel spanCalendJour_mode_vte_GEGS_H'>1</span><span class='spanCalendLibelle definition_legendeCalendSejourContactProp' id='legendeModeVenteGeGsChambre_" + idDiv + "'></span>";
            html += "</li>";
            html += "<li class='calendItea_li_legende' id='li_legende_cliquable_gegs_mode_vente'>";
            html += "<span class='spanCalendVisuel spanCalendJour_mode_vte_GEGS_G'>1</span><span class='spanCalendLibelle definition_legendeCalendSejourContactProp' id='legendeModeVenteGeGsGite_" + idDiv + "'></span>";
            html += "</li>";
        }
        html += "</ul>";
        html += "</div>";
    }
    if (params.afficheDisposParAnnee == "true") {
        html += "<div class='calendItea_clicMois' id='legende_clicMois_calendItea_" + idDiv + "'></div>";
    }
    html += "</div>";
    calendrier_setDispoEtJourArrivee(params, "calendItea_" + idDiv);
    return html;
}
function setActionsSurMois(ident) {
    for (var i = 1; i <= 12; i++) {
        var idCurr = "calendItea_libMois_" + i;
        if ($(idCurr)) {
            $(idCurr).onclick = function (evt) {
                objCaracCal = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
                var paramsSais = new Array();
                paramsSais.moisCurr = this.parentNode.getAttribute("mois");
                paramsSais.anneeCurr = this.parentNode.getAttribute("annee");
                paramsSais.langue = "FRANCAIS";
                afficheDivAvecTransparence(calendrier_getXHTML_1mois_saison(paramsSais.moisCurr, paramsSais.anneeCurr, paramsSais.langue, objCaracCal.id, 0, ident), 250, 180, "sais");
                var url = "/lib_2/ajax/contenuFenetre.php";
                var vars = "element=elemObjProd&typeInfo=afficheTarifParSaison-" + ident + "-" + paramsSais.moisCurr + "-" + paramsSais.anneeCurr;
                affUrlInDiv("div_tarifSais", url, vars, "aucun", majIdSaisonForUnMois);
            }
        }
    }
}
function majIdSaisonForUnMois() {
    var sais = $("chaine_sais_id").getAttribute("chaineSais");
    var idDivGene = $("div_tarifSais").getAttribute("idDivGene");
    var moisCurr = $("div_tarifSais").getAttribute("moisCurr");
    var anneeCurr = $("div_tarifSais").getAttribute("anneeCurr");
    calendrier_chargeMotCleDansCalendrierSais(idDivGene);
    calendrier_setClasseForCalSais(sais, idDivGene, moisCurr, anneeCurr);
}
function calendrier_chargeMotCleDeLaLegende(idDiv) {
    chargeMotCleDansDiv("legendeCliquable_" + idDiv, "LBL_LEGENDE_CALEND_ARRIVEE");
    chargeMotCleDansDiv("legendeLibre_" + idDiv, "LBL_LEGENDE_CALEND_LIBRE");
    chargeMotCleDansDiv("legendeSelect_" + idDiv, "LBL_LEGENDE_CALEND_SELECT");
    chargeMotCleDansDiv("legendeOccupe_" + idDiv, "LBL_LEGENDE_CALEND_OCCUPE");
    chargeMotCleDansDiv("legendeContact_" + idDiv, "LBL_LEGENDE_CALEND_CONTACTPROP");
    chargeMotCleDansDiv("legendeContactOu_" + idDiv, "LBL_LEGENDE_CALEND_OU");
    chargeMotCleDansDiv("legendeModeVenteGeGsGite_" + idDiv, "LBL_LEGENDE_MODE_VENTE_GITE");
    chargeMotCleDansDiv("legendeModeVenteGeGsChambre_" + idDiv, "LBL_LEGENDE_MODE_VENTE_CHAMBRE");
}
function calendrier_chargeMotCleDansCalendrier(idDiv) {
    chargeMotCleDansDiv("lblDisponibilitesNavigGauche_" + idDiv, "LBL_DISPONIBILITES");
    chargeMotCleDansDiv("lblDisponibilitesNavigDroite_" + idDiv, "LBL_DISPONIBILITES");
    chargeMotCleDansDiv("lblDisponibilitesAnneeCourante_" + idDiv, "LBL_DISPONIBILITES");
    chargeMotCleDansDiv("lblDisponibilitesRefInterne_" + idDiv, "LBL_NUM_HEBERGEMENT_PLANNING");
    chargeMotCleDansDiv("legende_clicMois_" + idDiv, "LBL_PLANNINGCLICSURMOIS");
    chargeMotCleDansDiv("div_planningBtFermer_" + idDiv, "LBL_PLANNINGFERMER");
}
function calendrier_chargeMotCleDansCalendrierSais(idDiv) {
    chargeMotCleDansDiv("div_planningBtFermerSais_" + idDiv, "LBL_PLANNINGFERMER");
}
function calendrier_moisAutre(tableCal, increment) {
    var obj = $(tableCal);
    var moisCurr = parseInt(obj.getAttribute("moisDeb"));
    var anneeCurr = parseInt(obj.getAttribute("annee"));
    var firstWeekDay = obj.getAttribute("firstWeekDay");
    var nbMois = parseInt(obj.getAttribute("nbMois"));
    var idDivGene = obj.getAttribute("idDivGene");
    var typeGite = obj.getAttribute("typeGite");
    var nb_chambre = obj.getAttribute("nb_chambre");
    var langue = obj.getAttribute("langue");
    var modeAff = obj.getAttribute("modeAff");
    var ident = obj.getAttribute("ident");
    var instance = obj.getAttribute("instance");
    var afficheDisposParAnnee = obj.getAttribute("afficheDisposParAnnee");
    var annee_min = obj.getAttribute("annee_min");
    var annee_max = obj.getAttribute("annee_max");
    var jrEnAvant = obj.getAttribute("jrEnAvant");
    var dateDebSej = obj.getAttribute("dateDebSej");
    var nbjSej = obj.getAttribute("nbjSej");
    var nonCliquable = obj.getAttribute('noncliquable');
    var classeAlternee;
    moisCurr += (nbMois * increment);
    if (moisCurr > 12) {
        moisCurr = moisCurr - 12;
        anneeCurr++;
    }
    if (moisCurr < 1) {
        moisCurr = 12 + moisCurr;
        anneeCurr--;
    }
    var today = new OBJDate();
    today.definition();
    if (afficheDisposParAnnee == "true") {
        nbMois = 12;
        idDiv = "valDisponibilitesAnneeCourante_" + idDivGene;
        div = $(idDiv);
        if (div)div.innerHTML = anneeCurr;
        var annee_prec = 0;
        var annee_suiv = 0;
        if (anneeCurr < annee_max && anneeCurr > annee_min) {
            annee_prec = anneeCurr - 1;
            annee_suiv = anneeCurr + 1;
        }
        else if (anneeCurr == annee_min) {
            if (annee_max != annee_min)annee_suiv = parseInt(anneeCurr) + 1;
        }
        else if (anneeCurr == annee_max) {
            if (annee_min != annee_max)annee_prec = parseInt(anneeCurr) - 1;
        }
        var idDivNavigGauche = "calendIteaNavigGauche_" + idDivGene;
        if ($(idDivNavigGauche)) {
            var objG = $(idDivNavigGauche);
            if (annee_prec != 0) {
                var htmlNavigGauche = "<a class='calendItea_navigGauche_lien' href='#dispoPrecedent' onclick='calendrier_moisAutre(this.parentNode.nextSibling.nextSibling.nextSibling.firstChild,-1)'>";
                htmlNavigGauche += "<span id='lblDisponibilitesNavigGauche_" + idDivGene + "'></span>&nbsp;";
                htmlNavigGauche += "<span id='valDisponibilitesNavigGauche_" + idDivGene + "'>" + annee_prec + "</span>";
                htmlNavigGauche += "</a>";
                objG.innerHTML = htmlNavigGauche;
            }
            else objG.innerHTML = "";
        }
        var idDivNavigDroite = "calendIteaNavigDroite_" + idDivGene;
        if ($(idDivNavigDroite)) {
            var objD = $(idDivNavigDroite);
            if (annee_suiv != 0) {
                var htmlNavigDroite = "<a class='calendItea_navigDroite_lien' href='#dispoSuivant' onclick=calendrier_moisAutre(this.parentNode.nextSibling.firstChild,1)>";
                htmlNavigDroite += "<span id='lblDisponibilitesNavigDroite_" + idDivGene + "'></span>&nbsp;";
                htmlNavigDroite += "<span id='valDisponibilitesNavigDroite_" + idDivGene + "'>" + annee_suiv + "</span>";
                htmlNavigDroite += "</a>";
                objD.innerHTML = htmlNavigDroite;
            }
            else objD.innerHTML = "";
        }
    }
    var html = "<ul id='ul_" + idDivGene + "' class='itea_ul calendItea_ul calendItea_ul_" + modeAff + "' moisDeb='" + moisCurr + "' annee='" + anneeCurr + "' nbMois='" + nbMois + "' firstWeekDay='" + firstWeekDay + "' idDivGene='" + idDivGene + "' typeGite='" + typeGite + "' nb_chambre='" + nb_chambre + "' langue='" + langue + "' modeAff='" + modeAff + "' ident='" + ident + "' instance='" + instance + "' afficheDisposParAnnee='" + afficheDisposParAnnee + "' annee_min='" + annee_min + "' annee_max='" + annee_max + "' jrEnAvant='" + jrEnAvant + "' dateDebSej='" + dateDebSej + "' nbjSej='" + nbjSej + "' nonCliquable='" + nonCliquable + "'>";
    var params = {"firstWeekDay": firstWeekDay, "nbMois": nbMois, "nonCliquable": nonCliquable};
    for (var i = 0; i < nbMois; i++) {
        if (moisCurr > 12) {
            moisCurr = moisCurr - 12;
            anneeCurr++;
        }
        if (moisCurr < 1) {
            moisCurr = 12 + moisCurr;
            anneeCurr--;
        }
        if (i % 2 == 0)classeAlternee = "calendItea_liPaire"; else classeAlternee = "calendItea_liImpaire";
        if (moisCurr < today.getMois() && anneeCurr <= today.getAnnee())classeInit = "moisNonInit"; else classeInit = "";
        html += "<li class='calendItea_li " + classeAlternee + " " + classeInit + "'>";
        params.moisCurr = moisCurr;
        params.anneeCurr = anneeCurr;
        params.langue = langue;
        params.nb_chambre = nb_chambre;
        params.typeGite = typeGite;
        params.afficheDisposParAnnee = afficheDisposParAnnee;
        params.jrEnAvant = jrEnAvant;
        params.dateDebSej = dateDebSej;
        params.nbjSej = nbjSej;
        if (modeAff == "LIGNE")html += calendrier_getXHTML_1moisLineaire(params, idDivGene); else html += calendrier_getXHTML_1mois(params, idDivGene);
        html += "</li>";
        moisCurr++;
    }
    html += "</ul>";
    obj.parentNode.innerHTML = html;
    var selectChambre;
    if ($("select_fiche_dispos_fngf_v4_chmbAnnee"))var id = "select_fiche_dispos_fngf_v4_chmbAnnee"; else var id = "select_fiche_dispos_fngf_v4_chmb";
    var objId = $(id);
    if (objId)selectChambre = objId.value;
    if (selectChambre > 0 || selectChambre == 0 || typeGite == "H" || (!ident && !instance)) {
        if (nb_chambre > 0)calendrier_setClasseForDisposForChambre(idDivGene, nb_chambre, modeAff); else calendrier_setClasseForJourArrTous(idDivGene);
    } else {
        if (ident)calendrier_setClasseForDispos(idDivGene);
        calendrier_setClasseForJourArr(idDivGene);
    }
    if (afficheDisposParAnnee == "true") {
        effaceDivAvecTransparence('sais');
        calendrier_chargeMotCleDansCalendrier(idDivGene);
        ident = new String(ident);
        var tabInfos = ident.split(".");
        var typeProd = tabInfos[3];
        if (typeProd == "G" || typeProd == "H")setActionsSurMois(ident);
    }
    $$(".calendItea_navigGauche a").each(function (e) {
        if (increment == '1') {
            e.show();
            if ($(e).up('div').up('div').down('.calendItea_listMois').select('.classeInit').length > 27)
                $(e).up('div').up('div').down('.calendItea_navigDroite').down('a').hide()
        }
        else {
            $(e).up('div').up('div').down('.calendItea_navigDroite').down('a').show()
            if (((e.getAttribute("data-anneMin") == anneeCurr)) && ((e.getAttribute("data-moisMin") == (moisCurr - 1)))) {
                e.hide()
            }
        }
    })
    if ($(idDivGene).foncQdChangeMois)$(idDivGene).foncQdChangeMois(moisCurr, anneeCurr);
}
function calendrier_moisAllerA(tableCal, moisDemande, anneeDemandee) {
    var obj = $(tableCal);
    var moisCurr = parseInt(obj.getAttribute("moisDeb"));
    var anneeCurr = parseInt(obj.getAttribute("annee"));
    var firstWeekDay = obj.getAttribute("firstWeekDay");
    var nbMois = parseInt(obj.getAttribute("nbMois"));
    var idDivGene = obj.getAttribute("idDivGene");
    var typeGite = obj.getAttribute("typeGite");
    var nb_chambre = obj.getAttribute("nb_chambre");
    var langue = obj.getAttribute("langue");
    var modeAff = obj.getAttribute("modeAff");
    var ident = obj.getAttribute("ident");
    var instance = obj.getAttribute("instance");
    var classeAlternee;
    moisCurr = moisDemande;
    anneeCurr = anneeDemandee;
    var html = "<ul id='ul_" + idDivGene + "' class='itea_ul calendItea_ul calendItea_ul_" + modeAff + "' moisDeb='" + moisCurr + "' annee='" + anneeCurr + "' nbMois='" + nbMois + "' firstWeekDay='" + firstWeekDay + "' idDivGene='" + idDivGene + "' typeGite='" + typeGite + "' nb_chambre='" + nb_chambre + "' langue='" + langue + "' modeAff='" + modeAff + "' ident='" + ident + "' instance='" + instance + "'>";
    var params = {"firstWeekDay": firstWeekDay, "nbMois": nbMois};
    for (var i = 0; i < nbMois; i++) {
        if (moisCurr > 12) {
            moisCurr = moisCurr - 12;
            anneeCurr++;
        }
        if (moisCurr < 1) {
            moisCurr = 12 + moisCurr;
            anneeCurr--;
        }
        if (i % 2 == 0)classeAlternee = "calendItea_liPaire"; else classeAlternee = "calendItea_liImpaire";
        html += "<li class='calendItea_li " + classeAlternee + "'>";
        params.moisCurr = moisCurr;
        params.anneeCurr = anneeCurr;
        params.langue = langue;
        params.nb_chambre = nb_chambre;
        params.typeGite = typeGite;
        if (modeAff == "LIGNE")html += calendrier_getXHTML_1moisLineaire(params, idDivGene); else html += calendrier_getXHTML_1mois(params, idDivGene);
        html += "</li>";
        moisCurr++;
    }
    html += "</ul>";
    obj.parentNode.innerHTML = html;
    if (typeGite == "H" || (!ident && !instance)) {
        if (nb_chambre > 0)calendrier_setClasseForDisposForChambre(idDivGene, nb_chambre, modeAff); else calendrier_setClasseForJourArrTous(idDivGene);
    } else {
        if (ident)calendrier_setClasseForDispos(idDivGene);
        calendrier_setClasseForJourArr(idDivGene);
    }
}
function calendrier_getXHTML_1mois(params, idDivGene) {
    var date = new OBJDate("15/" + params.moisCurr + "/" + params.anneeCurr);
    var html = "";
    var tabLbl = date.getJSONLblJourWeek(params.langue, 1);
    if (params.firstDayWeek)var idJour = params.firstDayWeek;
    var idJour = 1;
    var mois = params.moisCurr;
    var annee = params.anneeCurr;
    var dateCurr;
    var jourSelect = 0;
    var moisSelect = 0;
    var anneeSelect = 0;
    var dureeSelect = 0;
    if ($("mois"))moisSelect = $("mois").value;
    if ($("annee"))anneeSelect = $("annee").value;
    if ($("jour"))jourSelect = $("jour").value;
    if ($("duree"))dureeSelect = $("duree").value;
    var dateSelect = new OBJDate(jourSelect + "/" + moisSelect + "/" + anneeSelect);
    var dateFinSejourSelect = new OBJDate(jourSelect + "/" + moisSelect + "/" + anneeSelect);
    dateFinSejourSelect.ajoutJour(dureeSelect);
    html += "<table class='calend' mois='" + mois + "' annee='" + annee + "' firstWeekDay='" + params.firstWeekDay + "' nbMois='" + params.nbMois + "'>";
    if (params.afficheDisposParAnnee == "true")html += "<caption id='calendItea_libMois_" + mois + "'>" + date.getLibelleMois(params.langue) + "</caption>"; else html += "<caption>" + date.getLibelleMois(params.langue) + " " + annee + "</caption>";
    html += "<thead>";
    html += "<tr>";
    var j_curr = idJour;
    do {
        html += "<th class='calend_jour_" + j_curr + "'>";
        html += tabLbl[j_curr].libelle_court.charAt(0);
        html += "</th>";
        j_curr = (j_curr + 1) % 7;
    } while (j_curr != idJour);
    html += "</tr>";
    html += "</thead>";
    html += "<tbody>";
    var grille = calendrier_getTabGrille(params);
    for (var i = 0; i < grille.length; i++) {
        html += "<tr>";
        for (j = 0; j < grille[i].length; j++) {
            var jr = grille[i][j];
            html += "<td class='calend_jour_" + idJour + "'>";
            if (jr) {
                jr = parseInt(jr);
                var j2 = new String((jr < 10) ? "0" + jr : jr);
                var m2 = new String((mois < 10) ? "0" + mois : mois);
                var a2 = new String(annee);
                dateCurr = new OBJDate(j2 + "/" + m2 + "/" + a2);
                if (params.nonCliquable == 1) {
                    html += "<span id='" + idDivGene + "_id_" + j2 + m2 + a2 + "' etat='" + "' class='";
                } else {
                    html += "<span id='" + idDivGene + "_id_" + j2 + m2 + a2 + "' etat='" + "' class='classeInit";
                }
                var dateduJour = new OBJDate();
                dateduJour.definition()
                if (dateCurr.getJourSemaine() == params.jrEnAvant) {
                    if (dateduJour.estAvantOBJDate(dateCurr))html += " spanDateSejourMiseEnAvant";
                }
                if (params.dateDebSej) {
                    dateSelect = new OBJDate(params.dateDebSej);
                    dateFinSejourSelect = new OBJDate(params.dateDebSej);
                }
                if (params.nbjSej && dateFinSejourSelect)dateFinSejourSelect.ajoutJour(params.nbjSej);
                if (dateFinSejourSelect.toString() == dateCurr.toString())html += " spanDateFinSelect";
                if (dateSelect.toString("ddmmyyyy") == (j2 + m2 + a2))html += " spanDateArriveeSelect"; else {
                    if (dateCurr.estComprisEntre(dateSelect, dateFinSejourSelect))html += " spanDateSejourSelect";
                }
                html += "'>";
                html += jr;
                html += "</span>";
                idJour = (idJour + 1) % 7;
            } else html += "&nbsp;";
            html += "</td>";
        }
        html += "</tr>";
    }
    html += "</tbody>";
    html += "</table>";
    return html;
}
function calendrier_getXHTML_1moisLineaire(params, idDivGene) {
    var date = new OBJDate("15/" + params.moisCurr + "/" + params.anneeCurr);
    var html = "";
    var mois = params.moisCurr;
    var annee = params.anneeCurr;
    var dateCurr;
    var jourSelect = 0;
    var moisSelect = 0;
    var anneeSelect = 0;
    var dureeSelect = 0;
    if ($("mois"))moisSelect = $("mois").value;
    if ($("annee"))anneeSelect = $("annee").value;
    if ($("jour"))jourSelect = $("jour").value;
    if ($("duree"))dureeSelect = $("duree").value;
    var dateSelect = new OBJDate(jourSelect + "/" + moisSelect + "/" + anneeSelect);
    var dateFinSejourSelect = new OBJDate(jourSelect + "/" + moisSelect + "/" + anneeSelect);
    dateFinSejourSelect.ajoutJour(dureeSelect);
    html += "<table class='calend' mois='" + mois + "' annee='" + annee + "' firstWeekDay='" + params.firstWeekDay + "' nbMois='" + params.nbMois + "'>";
    if (params.afficheDisposParAnnee == "true")html += "<caption>" + date.getLibelleMois(params.langue) + "</caption>"; else html += "<caption>" + date.getLibelleMois(params.langue) + " " + annee + "</caption>";
    html += "<thead>";
    html += "<tr>";
    if (params.typeGite == "H")html += "<th class='calend_idLigne'></th>";
    var j_curr = 1;
    do {
        html += "<th class='calend_jour_" + j_curr + "'>";
        html += j_curr;
        html += "</th>";
        j_curr++;
    } while (j_curr <= date.getNbjMois());
    html += "</tr>";
    html += "</thead>";
    html += "<tbody>";
    var nb_chambre = params.nb_chambre;
    if (!nb_chambre)nb_chambre = 1;
    for (var i = 1; i <= nb_chambre; i++) {
        html += "<tr>";
        if (params.typeGite == "H")html += "<th class='calend_idLigne'>Chambre n°" + i + "</th>";
        for (j = 1; j <= date.getNbjMois(); j++) {
            html += "<td class='calend_jour_" + j + "'>";
            jr = parseInt(j);
            var j2 = (jr < 10) ? "0" + jr : jr;
            var m2 = (mois < 10) ? "0" + mois : mois;
            var a2 = annee;
            if (params.typeGite == "H")var idCurr = idDivGene + "_id_" + j2 + m2 + a2 + "_" + i; else var idCurr = idDivGene + "_id_" + j2 + m2 + a2;
            html += "<span id='" + idCurr + "' etat='' class='classeInit";
            if (dateSelect.toString("ddmmyyyy") == (j2 + m2 + a2))html += " spanDateArriveeSelect"; else {
                dateCurr = new OBJDate(j2 + "/" + m2 + "/" + a2);
                if (dateCurr.estComprisEntre(dateSelect, dateFinSejourSelect))html += " spanDateSejourSelect";
            }
            html += "'> </span>";
            html += "</td>";
        }
        html += "</tr>";
    }
    html += "</tbody>";
    html += "</table>";
    return html;
}
function calendrier_getXHTML_1mois_saison(moisCurr, anneeCurr, langueCurr, idDivGene, increment, ident) {
    var date = new OBJDate("15/" + moisCurr + "/" + anneeCurr);
    var html = "";
    var tabLbl = date.getJSONLblJourWeek(langueCurr);
    var idJour = 1;
    var mois = moisCurr;
    var annee = anneeCurr;
    var dateCurr;
    var jourSelect = 0;
    var moisSelect = 0;
    var anneeSelect = 0;
    var dureeSelect = 0;
    if ($("mois"))moisSelect = $("mois").value;
    if ($("annee"))anneeSelect = $("annee").value;
    if ($("jour"))jourSelect = $("jour").value;
    if ($("duree"))dureeSelect = $("duree").value;
    var dateSelect = new OBJDate(jourSelect + "/" + moisSelect + "/" + anneeSelect);
    var dateFinSejourSelect = new OBJDate(jourSelect + "/" + moisSelect + "/" + anneeSelect);
    dateFinSejourSelect.ajoutJour(dureeSelect);
    html += "<div id='div_calend_sais_1'></div>";
    html += "<div id='div_calend_sais_2'></div>";
    html += "<div id='div_calendSais_content'>";
    html += "<div id='titre_tarif_calend_saison'><span id='sp_titre_tarif_calend_saison'>Détail des tarifs</span></div>";
    html += "<div class='calendItea_navig calendItea_navigGauche' id='calendIteaNavigGauche_calendItea_" + idDivGene + "'>";
    html += "<a id='a_click_navig_gauche_saison' onClick=actionSurNavigCalendSaison('" + moisCurr + "','" + anneeCurr + "','" + langueCurr + "','" + idDivGene + "',-1,'" + ident + "');>";
    html += "<";
    html += "</a>";
    html += "</div>";
    html += "<div class='calendItea_navig calendItea_navigDroite' id='calendIteaNavigDroite_calendItea_" + idDivGene + "'>";
    html += "<a id='a_click_navig_droite_saison' onClick=actionSurNavigCalendSaison('" + moisCurr + "','" + anneeCurr + "','" + langueCurr + "','" + idDivGene + "',1,'" + ident + "');>";
    html += ">";
    html += "</a>";
    html += "</div>";
    html += "<div class='calendIteaBtFermer' id='div_planningBtFermerSais_" + idDivGene + "' onclick=effaceDivAvecTransparence('sais');></div>";
    html += "<table class='calend' mois='" + mois + "' annee='" + annee + "' firstWeekDay='' nbMois=''>";
    html += "<caption>" + date.getLibelleMois(langueCurr) + " " + annee + "</caption>";
    html += "<thead>";
    html += "<tr>";
    var j_curr = idJour;
    do {
        html += "<th class='calend_jour_" + j_curr + "'>";
        html += tabLbl[j_curr].libelle_court[0];
        html += "</th>";
        j_curr = (j_curr + 1) % 7;
    } while (j_curr != idJour);
    html += "</tr>";
    html += "</thead>";
    html += "<tbody>";
    var paramsSais = new Array();
    paramsSais.moisCurr = moisCurr;
    paramsSais.anneeCurr = anneeCurr;
    paramsSais.langue = langueCurr;
    var grille = calendrier_getTabGrille(paramsSais);
    for (var i = 0; i < grille.length; i++) {
        html += "<tr>";
        for (j = 0; j < grille[i].length; j++) {
            var jr = grille[i][j];
            html += "<td class='calend_jourSais_" + idJour + "'>";
            if (jr) {
                jr = parseInt(jr);
                var j2 = (jr < 10) ? "0" + jr : jr;
                var m2 = (mois < 10) ? "0" + mois : mois;
                var a2 = annee;
                html += "<span id='sais_" + idDivGene + "_id_" + j2 + m2 + a2 + "' saison='" + "' class='classeInit";
                if (dateSelect.toString("ddmmyyyy") == (j2 + m2 + a2))html += " spanDateArriveeSelect"; else {
                    dateCurr = new OBJDate(j2 + "/" + m2 + "/" + a2);
                    if (dateCurr.estComprisEntre(dateSelect, dateFinSejourSelect))html += " spanDateSejourSelect";
                }
                html += "'>";
                html += jr;
                html += "</span>";
                idJour = (idJour + 1) % 7;
            } else html += "&nbsp;";
            html += "</td>";
        }
        html += "</tr>";
    }
    html += "</tbody>";
    html += "</table>";
    html += "<div class='tarifSais' moisCurr='" + mois + "' anneeCurr='" + annee + "' idDivGene='" + idDivGene + "' id='div_tarifSais'></div>";
    html += "</div>";
    html += "<div id='div_calend_sais_3'></div>";
    html += "<div id='div_calend_sais_4'></div>";
    return html;
}
function actionSurNavigCalendSaison(moisCurr, anneeCurr, langueCurr, idDivGene, increment, ident) {
    var moisTmp = parseInt(moisCurr) + increment;
    if (moisTmp > 12) {
        moisCurr = 1;
        anneeCurr++;
    }
    else if (moisTmp < 1) {
        moisCurr = 12;
        anneeCurr--;
    }
    else moisCurr = moisTmp;
    $("divGraph_fenetresais").innerHTML = calendrier_getXHTML_1mois_saison(moisCurr, anneeCurr, langueCurr, idDivGene, increment, ident);
    var url = "/lib_2/ajax/contenuFenetre.php";
    var vars = "element=elemObjProd&typeInfo=afficheTarifParSaison-" + ident + "-" + moisCurr + "-" + anneeCurr;
    affUrlInDiv("div_tarifSais", url, vars, "aucun", majIdSaisonForUnMois);
}
function calendrier_getTabGrille(params) {
    if (params.firstWeekDay)var premJour = params.firstWeekDay;
    var premJour = 1;
    var date = new OBJDate("01/" + params.moisCurr + "/" + params.anneeCurr);
    var numJrDebut = date.getJourSemaine();
    var nbVideDebut = numJrDebut - premJour;
    if (nbVideDebut < 0)nbVideDebut += 7;
    var nbjMois = date.getNbjMois();
    var nb_ln = parseInt(nbjMois / 7) + 2;
    var tabGrilleMois = new Array();
    var jour = 1;
    for (var i = 0; i < nb_ln && jour <= nbjMois; i++) {
        if (!tabGrilleMois[i])tabGrilleMois[i] = new Array();
        for (j = 0; j < 7 && jour <= nbjMois; j++) {
            if (j < nbVideDebut)tabGrilleMois[i][j] = null; else {
                tabGrilleMois[i][j] = jour;
                jour++;
            }
        }
        nbVideDebut = -1;
    }
    return tabGrilleMois;
}
function calendrier_setDispoEtJourArrivee(params, idDivGene) {
    var url = "/lib_2/ajax/infosDist.php";
    if (params.ident) {
        if (params.typeGite == "H") {
            var sending = "info=DISPOS&ident=" + params.ident;
            if (params.apresToday)sending += "&apresToday=" + params.apresToday; else sending += "&apresToday=true";
            var vars;
            var nb_planningRecupere = 0;
            var nb_chambre = params.tabChambre.length;
            for (var i = 0; i < nb_chambre; i++) {
                vars = sending + "&numero_chambre=" + params.tabChambre[i].numero_chambre;
                appelAjaxToFunc(url, vars, function (reponseAjax) {
                    calendrier_recupDisposForChambre(reponseAjax, idDivGene);
                    nb_planningRecupere++;
                    if (nb_chambre == nb_planningRecupere) {
                        if (params.afficheDisposParAnnee || params.afficheNavChamvre)
                            setActionsSurListeChambres(params.tabChambre, params.ident, params.linkToResa, nbMois, params.modeVenteGeGs, idDivGene);
                        calendrier_setClasseForDisposForChambre(idDivGene, nb_chambre, params.modeAff);
                    }
                });
            }
        } else {
            var sending = "info=DISPOS&ident=" + params.ident;
            if (params.apresToday)sending += "&apresToday=" + params.apresToday; else sending += "&apresToday=true";
            appelAjaxToFunc(url, sending, function (reponseAjax) {
                calendrier_recupDispos(reponseAjax, idDivGene);
                calendrier_setClasseForDispos(idDivGene);
                calendrier_recupByAjaxEtAffJourArrivee(params, idDivGene);
            });
            if (params.modeVenteGeGs == "?") {
                var vars;
                var nb_planningRecupere = 0;
                var nb_chambre = params.tabChambre.length;
                for (var i = 0; i < nb_chambre; i++) {
                    vars = sending + "&numero_chambre=" + params.tabChambre[i].numero_chambre;
                    appelAjaxToFunc(url, vars, function (reponseAjax) {
                        calendrier_recupDisposForChambre(reponseAjax, idDivGene);
                        nb_planningRecupere++;
                        if (nb_chambre == nb_planningRecupere) {
                            if (params.afficheDisposParAnnee)
                                setActionsSurListeChambres(params.tabChambre, params.ident, params.linkToResa, nbMois, params.modeVenteGeGs, idDivGene);
                        }
                    });
                }
            }
        }
    } else if (params.typeGite != "H") {
        calendrier_recupByAjaxEtAffJourArrivee(params, idDivGene);
    }
}
function calendrier_recupByAjaxEtAffJourArrivee(params, idDivGene) {
    var url = "/lib_2/ajax/infosDist.php";
    var sending = "info=JOURARR";
    if (params.ident)sending += "&ident=" + params.ident;
    if (params.instance)sending += "&instance=" + params.instance;
    if (params.id_famille)sending += "&id_famille=" + params.id_famille;
    if (params.duree)sending += "&nbj=" + params.duree;
    if (params.apresToday)sending += "&apresToday=" + params.apresToday; else sending += "&apresToday=false";
    if (params.instance || params.ident) {
        appelAjaxToFunc(url, sending, function (reponseAjax) {
            calendrier_recupJourArr(reponseAjax, idDivGene);
            calendrier_setClasseForJourArr(idDivGene);
        });
    }
}
function calendrier_recupDispos(tabDispo, idDivGene) {
    eval("var infosDispo=" + tabDispo);
    var dte = new String(infosDispo.date_deb);
    var dispos = new String(infosDispo.chaineDispo);
    var apresToday = infosDispo.apresToday;
    if ($(idDivGene)) {
        $(idDivGene).setAttribute("dispos", dispos);
        $(idDivGene).setAttribute("dteDispos", dte);
        $(idDivGene).setAttribute("apresToday", apresToday);
    }
}
function calendrier_recupDisposForChambre(tabDispo, idDivGene) {
    eval("var infosDispo=" + tabDispo);
    var dte = new String(infosDispo.date_deb);
    var dispos = new String(infosDispo.chaineDispo);
    var apresToday = infosDispo.apresToday;
    var numero_chambre = infosDispo.numero_chambre;
    if ($(idDivGene)) {
        $(idDivGene).setAttribute("dispos_" + numero_chambre, dispos);
        $(idDivGene).setAttribute("dteDispos", dte);
        $(idDivGene).setAttribute("apresToday", apresToday);
    }
}
function calendrier_setClasseForDispos(idDivGene) {
    effaceMsgAttenteParDessus();
    var cliquable;
    var idCurr;
    var dispo;
    if ($(idDivGene)) {
        var dispos = $(idDivGene).getAttribute("dispos");
        var dte = new OBJDate($(idDivGene).getAttribute("dteDispos"));
        var apresToday = $(idDivGene).getAttribute("apresToday");
    }
    var today = new OBJDate();
    today.definition();
    if (dispos) {
        for (var i = 0; i < dispos.length; i++) {
            idCurr = idDivGene + "_id_" + dte.toString("ddmmyyyy");
            if ($(idCurr)) {
                if ((apresToday && dte.estApresOBJDate(today)) || !apresToday) {
                    dispo = dispos.charAt(i);
                    if ($(idCurr).hasClassName("classeInit") && dispo == ".")cliquable = true; else {
                        cliquable = false;
                        if (dispo != "." && $(idCurr).hasClassName("spanCalendCliquable")) {
                            $(idCurr).removeClassName("spanCalendCliquable");
                            $(idCurr).onclick = null;
                        }
                    }
                    if ($(idCurr).hasClassName("classeInit"))$(idCurr).removeClassName("classeInit");
                    $(idCurr).setAttribute("etat", dispo);
                    if (dispo == "X")$(idCurr).addClassName("spanCalendJour_mode_vte_GEGS_H"); else $(idCurr).addClassName(calendrier_getClassForJour(dispo, false, cliquable));
                    if (dispo == "n")$(idCurr).addClassName("spanCalendJour_ferme");
                    if ($(idCurr).hasClassName("classeMobile") && cliquable) {
                        cliquable = false;
                        $(idCurr).removeClassName("classeMobile");
                    }
                    if (cliquable)$(idCurr).onclick = function (evt) {
                        calendrier_clicDate(evt, this);
                    }
                }
            }
            dte.ajoutJour(1);
        }
    }
}
function calendrier_setClasseForCalSais(calsais, idDivGene, moisCurr, anneeCurr) {
    effaceMsgAttenteParDessus();
    var idCurr;
    var idDivDispo;
    var calsais;
    var dteCurr = "01/" + moisCurr + "/" + anneeCurr;
    var dte = new OBJDate(dteCurr);
    var classeSaison;
    var periodeIndispo;
    if (calsais) {
        for (var i = 0; i <= calsais.length; i++) {
            idCurr = "sais_" + idDivGene + "_id_" + dte.toString("ddmmyyyy");
            if ($(idCurr)) {
                sais = calsais.charAt(i);
                $(idCurr).setAttribute("saison", sais);
                classeSaison = "jour_saison_" + sais;
                idDivDispo = idDivGene + "_id_" + dte.toString("ddmmyyyy");
                if ($(idDivDispo)) {
                    if (($(idDivDispo).getAttribute("etat") == "n" || $(idDivDispo).getAttribute("etat") == "r") && !$(idDivDispo).hasClassName("spanCalendJour_libre")) {
                        classeSaison = "jour_saison_n";
                        periodeIndispo = true;
                    }
                }
                $(idCurr).addClassName(classeSaison);
            }
            dte.ajoutJour(1);
        }
    }
    if ($("div_legende_indispo_saison_unMois")) {
        if (!(periodeIndispo))$("div_legende_indispo_saison_unMois").style.display = "none";
    }
}
function calendrier_setClasseForDisposForChambre(idDivGene, nb_chambre, modeAff) {
    effaceMsgAttenteParDessus();
    var objGraph = $("divGraph_fenetre");
    if (objGraph)var styleDivGraph = objGraph.style.display; else var styleDivGraph = null;
    if ($("select_fiche_dispos_fngf_v4_chmbAnnee") && styleDivGraph != "none")var id = "select_fiche_dispos_fngf_v4_chmbAnnee"; else var id = "select_fiche_dispos_fngf_v4_chmb";
    var objId = $(id);
    if (objId && objId.value > 0) {
        calendrier_setClasseForDisposForChoixChambre(idDivGene, objId.value);
    }
    else {
        var cliquable;
        var idCurr;
        var dispo;
        var numero_chambre;
        for (var c = 1; c <= nb_chambre; c++) {
            numero_chambre = c;
            if ($(idDivGene)) {
                var dispos = $(idDivGene).getAttribute("dispos_" + numero_chambre);
                var dte = new OBJDate($(idDivGene).getAttribute("dteDispos"));
                var apresToday = $(idDivGene).getAttribute("apresToday");
            }
            var today = new OBJDate();
            today.definition();
            if (dispos) {
                for (var i = 0; i < dispos.length; i++) {
                    idCurr = idDivGene + "_id_" + dte.toString("ddmmyyyy");
                    if (modeAff == "LIGNE")idCurr += "_" + numero_chambre;
                    cliquable = false;
                    if ($(idCurr)) {
                        if ((apresToday && dte.estApresOBJDate(today)) || !apresToday) {
                            dispo = dispos.charAt(i);
                            if (dispo == ".")cliquable = true;
                            if ($(idCurr).hasClassName("classeInit"))$(idCurr).removeClassName("classeInit");
                            var planningMobile = false;
                            if ($(idCurr).hasClassName("classeMobile") && cliquable) {
                                var planningMobile = true;
                            }
                            $(idCurr).setAttribute("etat", dispo);
                            if (cliquable || dispo == "X") {
                                setClassForObj($(idCurr), "");
                            }
                            if (!$(idCurr).hasClassName("spanCalendCliquable")) {
                                if (dispo == "X")$(idCurr).addClassName("spanCalendJour_mode_vte_GEGS_G"); else $(idCurr).addClassName(calendrier_getClassForJour(dispo, false, cliquable));
                                if (dispo == "r")$(idCurr).addClassName("spanCalendJour_ferme");
                            }
                            if (planningMobile) {
                                $(idCurr).addClassName("smart_jourCalendrier");
                                $(idCurr).addClassName("classeMobile");
                                cliquable = false;
                            }
                            if (cliquable) {
                                $(idCurr).onclick = function (evt) {
                                    calendrier_clicDate(evt, this, modeAff);
                                }
                            }
                        }
                    }
                    dte.ajoutJour(1);
                }
            }
        }
    }
}
function calendrier_setClasseForDisposForChoixChambre(idDivGene, numero_chambre) {
    effaceMsgAttenteParDessus();
    var cliquable;
    var idCurr;
    var dispo;
    if ($(idDivGene)) {
        var dispos = $(idDivGene).getAttribute("dispos_" + numero_chambre);
        var dte = new OBJDate($(idDivGene).getAttribute("dteDispos"));
        var apresToday = $(idDivGene).getAttribute("apresToday");
    }
    var today = new OBJDate();
    today.definition();
    if (dispos) {
        for (var i = 0; i < dispos.length; i++) {
            idCurr = idDivGene + "_id_" + dte.toString("ddmmyyyy");
            cliquable = false;
            if ($(idCurr)) {
                if ((apresToday && dte.estApresOBJDate(today)) || !apresToday) {
                    dispo = dispos.charAt(i);
                    if (dispo == ".")cliquable = true;
                    $(idCurr).setAttribute("class", "classeInit");
                    if ($(idCurr).hasClassName("classeInit"))$(idCurr).removeClassName("classeInit");
                    $(idCurr).setAttribute("etat", dispo);
                    if (dispo == "X")$(idCurr).addClassName("spanCalendJour_mode_vte_GEGS_G"); else $(idCurr).addClassName(calendrier_getClassForJour(dispo, false, cliquable));
                    if (cliquable) {
                        setClassForObj($(idCurr), "");
                    }
                    if (!$(idCurr).hasClassName("spanCalendCliquable")) {
                        if (dispo == "X")$(idCurr).addClassName("spanCalendJour_mode_vte_GEGS_G"); else $(idCurr).addClassName(calendrier_getClassForJour(dispo, false, cliquable));
                    }
                    if (cliquable) {
                        $(idCurr).onclick = function (evt) {
                            var modeAff = "CARRE";
                            calendrier_clicDate(evt, this, modeAff);
                        }
                    }
                }
            }
            dte.ajoutJour(1);
        }
    }
}
function calendrier_recupJourArr(tabJourArr, idDivGene) {
    effaceMsgAttenteParDessus();
    eval("var infosJrArr=" + tabJourArr);
    var dte = new String(infosJrArr.date_deb);
    var jourArr = new String(infosJrArr.chaineJourArr);
    var nbjMini = parseInt(infosJrArr.nbjMini, 10);
    var apresToday = infosJrArr.apresToday;
    if (infosJrArr.duree) {
        var duree = parseInt(infosJrArr.duree, 10);
        var chaineWE = new String(infosJrArr.chaineWE);
        var nbjminWE = new String(infosJrArr.nbjminWE);
        var nbjmaxWE = new String(infosJrArr.nbjmaxWE);
    }
    if ($(idDivGene)) {
        $(idDivGene).setAttribute("jourArr", jourArr);
        $(idDivGene).setAttribute("dteJrArr", dte);
        $(idDivGene).setAttribute("nbjMini", nbjMini);
        $(idDivGene).setAttribute("apresToday", apresToday);
        $(idDivGene).setAttribute("duree", duree);
        $(idDivGene).setAttribute("chaineWE", chaineWE);
        $(idDivGene).setAttribute("nbjminWE", nbjminWE);
        $(idDivGene).setAttribute("nbjmaxWE", nbjmaxWE);
    }
}
function calendrier_setClasseForJourArr(idDivGene) {
    var jourArr = $(idDivGene).getAttribute("jourArr");
    var dte = new OBJDate($(idDivGene).getAttribute("dteJrArr"));
    var nbjMini = $(idDivGene).getAttribute("nbjMini");
    var duree = $(idDivGene).getAttribute("duree");
    var apresToday = $(idDivGene).getAttribute("apresToday");
    var ident = $(idDivGene).getAttribute("ident");
    if (duree) {
        var chaineWE = $(idDivGene).getAttribute("chaineWE");
        var nbjminWE = $(idDivGene).getAttribute("nbjminWE");
        var nbjmaxWE = $(idDivGene).getAttribute("nbjmaxWE");
    } else duree = 7;
    var idCurr;
    var idJour;
    var jr_arr;
    var we_nbjMin;
    var we_nbjMax;
    var jr_WE;
    var today = new OBJDate();
    today.definition();
    if (nbjMini)today.ajoutJour(nbjMini);
    if (duree < 7 && chaineWE) {
        var dateMiniWE = new OBJDate();
        dateMiniWE.definition();
        if (nbjminWE)we_nbjMin = nbjminWE; else we_nbjMin = 0;
        dateMiniWE.ajoutJour(we_nbjMin);
        var dateMaxiWE = new OBJDate();
        dateMaxiWE.definition();
        if (nbjmaxWE > 0)we_nbjMax = nbjmaxWE; else we_nbjMax = 999;
        dateMaxiWE.ajoutJour(we_nbjMax);
    }
    if (jourArr)
        for (var i = 0; i < jourArr.length; i++) {
            idJour = dte.getJourSemaine();
            idCurr = idDivGene + "_id_" + dte.toString("ddmmyyyy");
            if ($(idCurr)) {
                var etat_curr = $(idCurr).getAttribute("etat");
                jr_arr = jourArr.charAt(i);
                if (duree < 7 && chaineWE) {
                    jr_WE = chaineWE.charAt(i);
                    if (dte.estComprisEntre(dateMiniWE.toString(), dateMaxiWE.toString())) {
                        duree = parseInt(duree, 10);
                        switch (duree) {
                            case 0:
                                if ((!ident || (ident && etat_curr)) && $(idCurr).hasClassName("classeInit") && (idJour == "1" || idJour == "5" || jr_arr == idJour || jr_arr == "7") && (jr_WE == "O" || jr_WE == "W" || jr_WE == "M" || jr_WE == "T" || jr_WE == "N")) {
                                    $(idCurr).addClassName("spanCalendCliquable");
                                    $(idCurr).onmousedown = function (evt) {
                                        calendrier_clicDate(evt, this);
                                    }
                                } else {
                                    if ($(idCurr).hasClassName("spanCalendCliquable") && jr_arr != idJour && jr_arr != "7") {
                                        switch (idJour) {
                                            case 1:
                                                if (jr_WE != "O" && jr_WE != "M" && jr_WE != "T" && jr_WE != "X") {
                                                    $(idCurr).removeClassName("spanCalendCliquable");
                                                    $(idCurr).onmousedown = null;
                                                }
                                                break;
                                            case 5:
                                                if (jr_WE != "O" && jr_WE != "M" && jr_WE != "W" && jr_WE != "T" && jr_WE != "X") {
                                                    $(idCurr).removeClassName("spanCalendCliquable");
                                                    $(idCurr).onmousedown = null;
                                                }
                                                break;
                                            case 0:
                                                if (jr_WE != "O" && jr_WE != "W" && jr_WE != "T" && jr_WE != "X") {
                                                    $(idCurr).removeClassName("spanCalendCliquable");
                                                    $(idCurr).onmousedown = null;
                                                } else {
                                                    $(idCurr).removeClassName("spanCalendCliquable");
                                                    $(idCurr).onmousedown = null;
                                                }
                                                break;
                                            default:
                                                $(idCurr).removeClassName("spanCalendCliquable");
                                                $(idCurr).onmousedown = null;
                                                break;
                                        }
                                    }
                                }
                                break;
                            case 2:
                                if ((!ident || (ident && etat_curr)) && $(idCurr).hasClassName("classeInit") && (idJour == "5" || jr_arr == idJour || jr_arr == "7") && (jr_WE == "O" || jr_WE == "W" || jr_WE == "T")) {
                                    $(idCurr).addClassName("spanCalendCliquable");
                                    $(idCurr).onclick = function (evt) {
                                        calendrier_clicDate(evt, this);
                                    }
                                } else {
                                    if ($(idCurr).hasClassName("spanCalendCliquable") && ((idJour != "5" && jr_arr != idJour && jr_arr != "7") || (jr_WE != "O" && jr_WE != "W" && jr_WE != "T"))) {
                                        $(idCurr).removeClassName("spanCalendCliquable");
                                        $(idCurr).onclick = null;
                                    }
                                }
                                break;
                            case 4:
                                if ((!ident || (ident && etat_curr)) && $(idCurr).hasClassName("classeInit") && (idJour == "1" || jr_arr == idJour || jr_arr == "7") && (jr_WE == "O" || jr_WE == "M" || jr_WE == "T")) {
                                    $(idCurr).addClassName("spanCalendCliquable");
                                    $(idCurr).onclick = function (evt) {
                                        calendrier_clicDate(evt, this);
                                    }
                                } else {
                                    if ($(idCurr).hasClassName("spanCalendCliquable") && ((idJour != "1" && jr_arr != idJour && jr_arr != "7") || (jr_WE != "O" && jr_WE != "M" && jr_WE != "T"))) {
                                        $(idCurr).removeClassName("spanCalendCliquable");
                                        $(idCurr).onclick = null;
                                    }
                                }
                                break;
                            default:
                                if ($(idCurr).hasClassName("spanCalendCliquable") && (jr_arr == idJour || jr_arr == "7") && jr_WE == "T") {
                                    $(idCurr).addClassName("spanCalendCliquable");
                                    $(idCurr).onclick = function (evt) {
                                        calendrier_clicDate(evt, this);
                                    }
                                } else {
                                    if ($(idCurr).hasClassName("spanCalendCliquable") && ((jr_arr != idJour && jr_arr != "7") || jr_WE != "T")) {
                                        $(idCurr).removeClassName("spanCalendCliquable");
                                        $(idCurr).onclick = null;
                                    }
                                }
                                break;
                        }
                    }
                    else if ($(idCurr).hasClassName("spanCalendCliquable") && jr_arr != idJour && jr_arr != "7") {
                        $(idCurr).removeClassName("spanCalendCliquable");
                        $(idCurr).onclick = null;
                    }
                } else {
                    if ((!ident || (ident && etat_curr)) && $(idCurr).hasClassName("classeInit") && (jr_arr == idJour || jr_arr == "7")) {
                        if ((apresToday && dte.estApresOBJDate(today)) || !apresToday) {
                            $(idCurr).addClassName("spanCalendCliquable");
                            $(idCurr).onclick = function (evt) {
                                calendrier_clicDate(evt, this);
                            }
                        }
                    } else {
                        if ((jr_arr != idJour && jr_arr != "7") && $(idCurr).hasClassName("spanCalendCliquable")) {
                            $(idCurr).removeClassName("spanCalendCliquable");
                            $(idCurr).onclick = null;
                        }
                    }
                }
                if ($(idCurr).hasClassName("classeInit"))$(idCurr).removeClassName("classeInit");
            }
            dte.ajoutJour(1);
        }
}
function calendrier_setClasseForJourArrTous(idDivGene) {
    var dte = new OBJDate();
    dte.definition();
    var idCurr;
    var today = new OBJDate();
    today.definition();
    var paramsJoursArrivee = window.paramsJoursArriveeGeneral || false;
    var indice = 0;
    if (paramsJoursArrivee) {
        var chaineJoursArrivee = paramsJoursArrivee.chaineJoursArrivee;
        var dateDebChaineJoursArrivee = new OBJDate(paramsJoursArrivee.dateDebChaineJoursArrivee);
        indice = dateDebChaineJoursArrivee.getNbJourEcartWithOBJDate(dte);
    }
    for (var i = 0; i < 731; i++) {
        idCurr = idDivGene + "_id_" + dte.toString("ddmmyyyy");
        (function ($) {
            if ($('#' + idCurr)) {
                if ($('#' + idCurr).hasClass("classeInit") && dte.estApresOBJDate(today)) {
                    if ((!navigator.userAgent.match(/MSIE 7/) && !navigator.userAgent.match(/MSIE 6/)) && paramsJoursArrivee && chaineJoursArrivee[indice] != '1') {
                        $('#' + idCurr).removeClass("classeInit");
                    }
                    else {
                        $('#' + idCurr).addClass("spanCalendCliquable");
                        $('#' + idCurr).removeClass("classeInit");
                        $('#' + idCurr).click(function (evt) {
                            calendrier_clicDate(evt, this);
                        });
                    }
                }
            }
        })(jQuery)
        indice++;
        dte.ajoutJour(1);
    }
}
function calendrier_setClasseForJourArrTousGP(idDivGene) {
    var dte = new OBJDate();
    dte.definition();
    var idCurr;
    var today = new OBJDate();
    today.definition();
    for (var i = 0; i < 731; i++) {
        idCurr = idDivGene + "_id_" + dte.toString("ddmmyyyy");
        if ($(idCurr)) {
            if ($(idCurr).hasClassName("classeInit") && dte.estApresOBJDate(today)) {
                $(idCurr).addClassName("spanCalendCliquable");
                $(idCurr).removeClassName("classeInit");
                $(idCurr).onclick = function (evt) {
                    calendrier_clicDateGP(evt, this, false);
                }
            }
        }
        dte.ajoutJour(1);
    }
}
function calendrier_getClassForJour(etat, differencieEtats, cliquable) {
    var tabClass;
    var classEtat;
    if (differencieEtats)tabClass = calendrier_getTabClassEtatsDifferencies(); else tabClass = calendrier_getTabClassEtat();
    var classe = "spanCalendJour_" + tabClass.getEtatLong(etat);
    if (cliquable && etat == ".")classe += " spanCalendCliquable";
    return classe;
}
function calendrier_getClassForJourForParamSais(etat, differencieEtats, cliquable) {
    var tabClass;
    var classEtat;
    if (differencieEtats)tabClass = calendrier_getTabClassEtatsDifferencies(); else tabClass = calendrier_getTabClassEtat();
    var classe = "spanCalendJour_" + tabClass.getEtatLong(etat);
    if (cliquable && etat == ".")classe += " spanCalendCliquable";
    return classe;
}
function calendrier_getTabClassEtatsDifferencies() {
    var tabEtat = {
        "getEtatLong": function (etat) {
            switch (etat) {
                case"i":
                    return "intention";
                case"o":
                    return "option";
                case"O":
                    return "option";
                case"O":
                    return "preoption";
                case"r":
                    return "resa";
                case"R":
                    return "resa";
                case"R":
                    return "preresa";
                case"I":
                    return "preintention";
                case"n":
                    return "ferme";
                case"N":
                    return "nonautorise";
                case"a":
                    return "allotement";
                case"L":
                    return "limite";
                case".":
                    return "libre";
                case"?":
                    return "inconnu";
                case"G":
                    return "modeVenteGEGS_G";
                case"H":
                    return "modeVenteGEGS_H";
                case"X":
                    return "bloque";
            }
        }
    };
    return tabEtat;
}
function calendrier_getTabClassEtat() {
    var tabEtat = {
        "getEtatLong": function (etat) {
            switch (etat) {
                case"i":
                    return "contact";
                case"o":
                    return "option";
                case"r":
                    return "occupe";
                case"I":
                    return "contact";
                case"O":
                    return "option";
                case"R":
                    return "occupe";
                case"n":
                    return "occupe";
                case"N":
                    return "occupe";
                case"a":
                    return "contact";
                case"L":
                    return "contact";
                case".":
                    return "libre";
                case"?":
                    return "inconnu";
                case"X":
                    return "mode_vte_GEGS";
            }
        }
    };
    return tabEtat;
}
function calendrier_clicDate(evt, obj, modeAff) {
    if (!modeAff)modeAff = "CARRE";
    var tabClass = calendrier_getTabClassEtatsDifferencies();
    var etat = tabClass.getEtatLong(obj.getAttribute("etat"));
    var tabId = obj.id.split("_");
    if (modeAff == "LIGNE")var chaine = new String(tabId[tabId.length - 2]); else var chaine = new String(tabId[tabId.length - 1]);
    var jour = chaine.substr(0, 2);
    var mois = chaine.substr(2, 2);
    var annee = chaine.substr(4, 4);
    var objetDate = new OBJDate(chaine);
    var jrSemaine = objetDate.getJourSemaine();
    var linkToResa = obj.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('linkToResa');
    if (obj.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.foncQdClicGauche) {
        obj.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.foncQdClicGauche(evt, jour, mois, annee, etat, jrSemaine);
    } else if (linkToResa) {
        var parts = linkToResa.split("?");
        var adr = parts[0];
        var sending = parts[1];
        var reg1 = new RegExp("(resaGl/sejour.php)", "g");
        if (adr.match(reg1)) {
            if (jour)sending += "&jour=" + jour;
            if (mois)sending += "&mois=" + mois;
            if (annee)sending += "&annee=" + annee;
        }
        var reg2 = new RegExp("(reservation-externe.php)", "g");
        if (adr.match(reg2)) {
            sending += "&reinit=O";
            if (jour)sending += "&jour=" + jour;
            if (mois)sending += "&mois=" + mois;
            if (annee)sending += "&annee=" + annee;
        }
        calendrier_redirectFrmToResa(adr, sending);
    }
}
function setCalendrierToDivGP(idDiv, params) {
    if (!params.langue)params.langue = "FRANCAIS";
    div = $(idDiv);
    if (div) {
        div.innerHTML = calendrier_getXHTMLForGP(params, idDiv);
        if (!params.nePasChargerMotCles)calendrier_chargeMotCleDeLaLegendeGP(idDiv);
        affMsgAttenteParDessusInDiv(idDiv);
        div.firstChild.foncQdClicGauche = params.clic;
    }
}
function calendrier_getXHTMLForGP(params, idDiv) {
    var html = "";
    if (params.nbMois)nbMois = params.nbMois; else nbMois = 1;
    var today = new OBJDate();
    today.definition();
    if (!params.moisDebut)params.moisDebut = today.getMois();
    if (!params.anneeDebut)params.anneeDebut = today.getAnnee();
    var mois = params.moisDebut;
    var annee = params.anneeDebut;
    var langue = params.langue;
    if (!langue)langue = "FRANCAIS";
    var classeAlternee;
    if (params.code)var code = params.code; else var code = "";
    var request = params.request;
    if (!params.request)request = "N";
    var nb_stock = params.tabStock.length;
    html = "<div class='calendItea calendIteaGP' id='calendItea_" + idDiv + "'>";
    html += "<div class='calendItea_navig calendItea_navigGauche'>";
    html += "<a onclick=calendrier_moisAutreGP(this.parentNode.nextSibling.firstChild,-1)><</a>";
    html += "</div>";
    html += "<div class=calendIteaGP_listMois>";
    html += "<ul class='itea_ul calendIteaGP_ul calendItea_ul' moisDeb='" + mois + "' annee='" + annee + "' nbMois='" + nbMois + "' firstWeekDay='" + params.firstWeekDay + "' idDivGene='calendItea_" + idDiv + "' nb_stock='" + nb_stock + "' langue='" + langue + "' code='" + code + "' instance='" + params.instance + "'  request='" + request + "' tabStock='" + params.tabStock.toJSON() + "'>";
    moisCurr = mois;
    anneeCurr = annee;
    for (var i = 0; i < nbMois; i++) {
        if (i % 2 == 0)classeAlternee = "calendIteaGP_liPaire"; else classeAlternee = "calendIteaGP_liImpaire";
        html += "<li class='calendIteaGP_li " + classeAlternee + "'>";
        params.moisCurr = moisCurr;
        params.anneeCurr = anneeCurr;
        params.nb_stock = nb_stock;
        html += calendrier_getXHTML_1moisLineaireGP(params, "calendItea_" + idDiv);
        html += "</li>";
        moisCurr++;
        if (moisCurr > 12) {
            moisCurr = 1;
            anneeCurr++;
        }
    }
    html += "</ul>";
    html += "</div>";
    html += "<div class='calendIteaGP_navig calendItea_navigDroite'>";
    html += "<a onclick=calendrier_moisAutreGP(this.parentNode.previousSibling.firstChild,1)>></a>";
    html += "</div>";
    if (params.code) {
        html += "<div class='calendIteaGP_legende'>";
        html += "<ul class='itea_ul ul_legendeCalendGP'>";
        html += "<li class='calendIteaGP_li_legende'>";
        html += "<span class='spanCalendCliquableResaGP'>&nbsp;</span><span class='definition_legendeCalendCliquableResaGP' id='legendeCliquableResa_" + idDiv + "'></span>";
        html += "</li>";
        html += "<li class='calendIteaGP_li_legende'>";
        html += "<span class='spanCalendJourGP_libre'>&nbsp;</span><span class='definition_legendeCalendLibreGP' id='legendeLibre_" + idDiv + "'></span>";
        html += "</li>";
        html += "<li class='calendIteaGP_li_legende'>";
        html += "<span class='spanDateSejourOccupeGP'>&nbsp;</span><span class='definition_legendeCalendSejourOccupeGP' id='legendeOccupe_" + idDiv + "'></span>";
        html += "</li>";
        html += "<li class='calendIteaGP_li_legende'>";
        html += "<span class='spanCalendCliquableDevisGP'>&nbsp;</span><span class='definition_legendeCalendCliquableDevisGP' id='legendeCliquableDevis_" + idDiv + "'></span>";
        html += "</li>";
        html += "<li class='calendIteaGP_li_legende'>";
        html += "<span class='spanDateSejourDevisGP'>&nbsp;</span><span class='definition_legendeCalendSejourDevisGP' id='legendeDevis_" + idDiv + "'></span>";
        html += "</li>";
        html += "<li class='calendIteaGP_li_legende'>";
        html += "<span class='spanDateSejourSelectGP'>&nbsp;</span><span class='definition_legendeCalendSejourSelectGP' id='legendeSelect_" + idDiv + "'></span>";
        html += "</li>";
        html += "</ul>";
        html += "</div>";
    }
    html += "</div>";
    calendrier_setDispoEtJourArriveeGP(params, "calendItea_" + idDiv);
    return html;
}
function calendrier_chargeMotCleDeLaLegendeGP(idDiv) {
    chargeMotCleDsDiv("legendeCliquableResa_" + idDiv, "LBL_LEGENDE_CALEND_ARRIVEE_RESA");
    chargeMotCleDsDiv("legendeLibre_" + idDiv, "LBL_LEGENDE_CALEND_LIBRE");
    chargeMotCleDsDiv("legendeOccupe_" + idDiv, "LBL_LEGENDE_CALEND_OCCUPE");
    chargeMotCleDsDiv("legendeCliquableDevis_" + idDiv, "LBL_LEGENDE_CALEND_ARRIVEE_DEVIS");
    chargeMotCleDsDiv("legendeDevis_" + idDiv, "LBL_LEGENDE_CALEND_DEVIS");
    chargeMotCleDsDiv("legendeSelect_" + idDiv, "LBL_LEGENDE_CALEND_SELECT");
}
function calendrier_setPeriodeInClass(idDiv, classname, jdeb, mdeb, adeb, jfin, mfin, afin) {
    var dteDeb = new OBJDate();
    dteDeb.definition();
    dteDeb.setDateByInfos(jdeb, mdeb, adeb);
    var dteFin = new OBJDate();
    dteFin.definition();
    dteFin.setDateByInfos(jfin, mfin, afin);
    $$("." + classname).each(function (obj) {
        obj.removeClassName(classname)
    });
    var idCurr;
    for (var i = 0; i < 731; i++) {
        idCurr = "calendItea_" + idDiv + "_id_" + dteDeb.toString("ddmmyyyy");
        if ($(idCurr)) {
            if (dteFin.estApresOBJDate(dteDeb)) {
                $(idCurr).addClassName(classname);
            }
        }
        dteDeb.ajoutJour(1);
    }
}
function calendrier_getXHTML_1moisLineaireGP(params, idDivGene) {
    var date = new OBJDate("15/" + params.moisCurr + "/" + params.anneeCurr);
    var html = "";
    var mois = params.moisCurr;
    var annee = params.anneeCurr;
    var dateCurr;
    var jourSelect = 0;
    var moisSelect = 0;
    var anneeSelect = 0;
    var dureeSelect = 0;
    if ($("mois"))moisSelect = $("mois").value;
    if ($("annee"))anneeSelect = $("annee").value;
    if ($("jour"))jourSelect = $("jour").value;
    if ($("duree"))dureeSelect = $("duree").value;
    var dateSelect = new OBJDate(jourSelect + "/" + moisSelect + "/" + anneeSelect);
    var dateFinSejourSelect = new OBJDate(jourSelect + "/" + moisSelect + "/" + anneeSelect);
    dateFinSejourSelect.ajoutJour(dureeSelect);
    html += "<table class='calendGP' mois='" + mois + "' annee='" + annee + "' firstWeekDay='" + params.firstWeekDay + "' nbMois='" + params.nbMois + "'>";
    html += "<caption>" + date.getLibelleMois(params.langue) + " " + annee + "</caption>";
    html += "<thead>";
    html += "<tr>";
    html += "<th class='calend_idLigne'></th>";
    var j_curr = 1;
    var tabJour = date.getJSONLblJourWeek(params.langue);
    do {
        var j1 = (j_curr < 10) ? "0" + j_curr : j_curr;
        var m1 = (mois < 10) ? "0" + mois : mois;
        var a1 = annee;
        dateCurr = new OBJDate(j1 + "/" + m1 + "/" + a1);
        lblJour = tabJour[dateCurr.getJourSemaine()].libelle_court;
        html += "<th class='calend_jour_" + j_curr + "'>";
        html += "<span class='calend_jour_lbl'>" + lblJour + "</span>";
        html += "<span class='calend_jour_numero'>" + j_curr + "</span>";
        html += "</th>";
        j_curr++;
    } while (j_curr <= date.getNbjMois());
    html += "</tr>";
    html += "</thead>";
    html += "<tbody>";
    var nb_stock = params.nb_stock;
    for (var i = 0; i < nb_stock; i++) {
        html += "<tr>";
        html += "<th class='calendGP_idLigne'>" + params.tabStock[i].lbl + "</th>";
        for (j = 1; j <= date.getNbjMois(); j++) {
            html += "<td class='calendGP_jour_" + j + "'>";
            jr = parseInt(j);
            var j2 = (jr < 10) ? "0" + jr : jr;
            var m2 = (mois < 10) ? "0" + mois : mois;
            var a2 = annee;
            var code_stock = new String(params.tabStock[i].code);
            var idCurr = idDivGene + "_id_" + j2 + m2 + a2 + "_" + code_stock.replace("/", "_slash_");
            html += "<span id='" + idCurr + "' etat='' class='classeInit";
            if (dateSelect.toString("ddmmyyyy") == (j2 + m2 + a2))html += " spanDateArriveeSelect"; else {
                dateCurr = new OBJDate(j2 + "/" + m2 + "/" + a2);
                if (dateCurr.estComprisEntre(dateSelect, dateFinSejourSelect))html += " spanDateSejourSelect";
            }
            html += "'> </span>";
            html += "</td>";
        }
        html += "</tr>";
    }
    html += "</tbody>";
    html += "</table>";
    return html;
}
function calendrier_moisAutreGP(tableCal, increment) {
    var obj = $(tableCal);
    var moisCurr = parseInt(obj.getAttribute("moisDeb"));
    var anneeCurr = parseInt(obj.getAttribute("annee"));
    var firstWeekDay = obj.getAttribute("firstWeekDay");
    var nbMois = parseInt(obj.getAttribute("nbMois"));
    var idDivGene = obj.getAttribute("idDivGene");
    var nb_stock = obj.getAttribute("nb_stock");
    var langue = obj.getAttribute("langue");
    var instance = obj.getAttribute("instance");
    var code = obj.getAttribute("code");
    var request = obj.getAttribute("request");
    eval("var tabStock=" + obj.getAttribute("tabStock"));
    var classeAlternee;
    moisCurr += (nbMois * increment);
    if (moisCurr > 12) {
        moisCurr = moisCurr - 12;
        anneeCurr++;
    }
    if (moisCurr < 1) {
        moisCurr = 12 + moisCurr;
        anneeCurr--;
    }
    var html = "<ul class='itea_ul calendIteaGP_ul calendItea_ul' moisDeb='" + moisCurr + "' annee='" + anneeCurr + "' nbMois='" + nbMois + "' firstWeekDay='" + firstWeekDay + "' idDivGene='" + idDivGene + "' nb_stock='" + nb_stock + "' langue='" + langue + "' code='" + code + "' instance='" + instance + "' request='" + request + "' tabStock='" + tabStock.toJSON() + "'>";
    var params = {"firstWeekDay": firstWeekDay, "nbMois": nbMois};
    for (var i = 0; i < nbMois; i++) {
        if (moisCurr > 12) {
            moisCurr = moisCurr - 12;
            anneeCurr++;
        }
        if (moisCurr < 1) {
            moisCurr = 12 + moisCurr;
            anneeCurr--;
        }
        if (i % 2 == 0)classeAlternee = "calendIteaGP_liPaire"; else classeAlternee = "calendIteaGP_liImpaire";
        html += "<li class='calendIteaGP_li " + classeAlternee + "'>";
        params.moisCurr = moisCurr;
        params.anneeCurr = anneeCurr;
        params.langue = langue;
        params.nb_stock = nb_stock;
        params.instance = instance;
        params.tabStock = tabStock;
        params.code = code;
        params.request = request;
        html += calendrier_getXHTML_1moisLineaireGP(params, idDivGene);
        html += "</li>";
        moisCurr++;
    }
    html += "</ul>";
    obj.parentNode.innerHTML = html;
    calendrier_setClasseForDisposForProd(idDivGene, nb_stock, tabStock, request);
    calendrier_setClasseForJourArrGP(idDivGene, nb_stock, tabStock, request);
}
function calendrier_setDispoEtJourArriveeGP(params, idDivGene) {
    var url = "/lib_2/ajax/infosDist.php";
    if (params.code) {
        var sending = "info=DISPOS_GP&code=" + params.code + "&instance=" + params.instance;
        if (params.apresToday)sending += "&apresToday=" + params.apresToday; else sending += "&apresToday=true";
        var vars;
        var nb_planningRecupere = 0;
        var nb_stock = params.tabStock.length;
        for (var i = 0; i < nb_stock; i++) {
            vars = sending + "&code_stock=" + params.tabStock[i].code;
            appelAjaxToFunc(url, vars, function (reponseAjax) {
                calendrier_recupDisposForProd(reponseAjax, idDivGene);
                nb_planningRecupere++;
                if (nb_stock == nb_planningRecupere)calendrier_setClasseForDisposForProd(idDivGene, nb_stock, params.tabStock, params.request);
            });
        }
    }
    if (params.code) {
        var sending = "info=JOURARR_GP&instance=" + params.instance + "&code=" + params.code;
        if (params.apresToday)sending += "&apresToday=" + params.apresToday; else sending += "&apresToday=true";
        appelAjaxToFunc(url, sending, function (reponseAjax) {
            calendrier_recupJourArrGP(reponseAjax, idDivGene);
            calendrier_setClasseForJourArrGP(idDivGene, nb_stock, params.tabStock, params.request);
        });
    }
}
function calendrier_recupDisposForProd(tabDispo, idDivGene) {
    eval("var infosDispo=" + tabDispo);
    var dte = new String(infosDispo.date_deb);
    var dispos = new String(infosDispo.chaineDispo);
    var apresToday = infosDispo.apresToday;
    var code_stock = new String(infosDispo.code_stock);
    if ($(idDivGene)) {
        $(idDivGene).setAttribute("dispos_" + code_stock.replace("/", "_slash_"), dispos);
        $(idDivGene).setAttribute("dteDispos", dte);
        $(idDivGene).setAttribute("apresToday", apresToday);
    }
}
function calendrier_recupJourArrGP(tabJourArr, idDivGene) {
    effaceMsgAttenteParDessus();
    eval("var infosJrArr=" + tabJourArr);
    var dte = new String(infosJrArr.date_deb);
    var jourArr = new String(infosJrArr.jourArr);
    var apresToday = infosJrArr.apresToday;
    var nbjMini = infosJrArr.nbjMini;
    if ($(idDivGene)) {
        $(idDivGene).setAttribute("jourArr", jourArr);
        $(idDivGene).setAttribute("dteJrArr", dte);
        $(idDivGene).setAttribute("apresToday", apresToday);
        $(idDivGene).setAttribute("nbjMini", nbjMini);
    }
}
function calendrier_setClasseForDisposForProd(idDivGene, nb_stock, tabStock, request) {
    effaceMsgAttenteParDessus();
    var cliquable;
    var idCurr;
    var dispo;
    var code_stock;
    for (var c = 0; c < nb_stock; c++) {
        code_stock = new String(tabStock[c].code);
        code_stock = code_stock.replace("/", "_slash_");
        if ($(idDivGene)) {
            var dispos = $(idDivGene).getAttribute("dispos_" + code_stock);
            var dte = new OBJDate($(idDivGene).getAttribute("dteDispos"));
            var apresToday = $(idDivGene).getAttribute("apresToday");
        }
        var today = new OBJDate();
        today.definition();
        if (dispos) {
            for (var i = 0; i < dispos.length; i++) {
                idCurr = idDivGene + "_id_" + dte.toString("ddmmyyyy");
                idCurr += "_" + code_stock;
                cliquable = false;
                if ($(idCurr)) {
                    if ((apresToday && dte.estApresOBJDate(today)) || !apresToday) {
                        dispo = dispos.charAt(i);
                        if ($(idCurr).hasClassName("classeInit") && (dispo == "1" || (dispo == "0" && request == "O")))cliquable = true; else {
                            cliquable = false;
                            if (dispo != "1" && request != "O" && $(idCurr).hasClassName("spanCalendCliquableGP")) {
                                $(idCurr).removeClassName("spanCalendCliquableGP");
                                $(idCurr).onclick = null;
                            }
                        }
                        if ($(idCurr).hasClassName("classeInit"))$(idCurr).removeClassName("classeInit");
                        $(idCurr).setAttribute("etat", dispo);
                        $(idCurr).addClassName(calendrier_getClassForJourGP(dispo, request, cliquable));
                        if (cliquable) {
                            $(idCurr).onclick = function (evt) {
                                calendrier_clicDateGP(evt, this, request);
                            }
                        }
                    }
                }
                dte.ajoutJour(1);
            }
        }
    }
}
function calendrier_setClasseForJourArrGP(idDivGene, nb_stock, tabStock, request) {
    var jourArr = $(idDivGene).getAttribute("jourArr");
    var dte = new OBJDate($(idDivGene).getAttribute("dteJrArr"));
    var nbjMini = $(idDivGene).getAttribute("nbjMini");
    var apresToday = $(idDivGene).getAttribute("apresToday");
    var idCurr;
    var jr_arr;
    var today = new OBJDate();
    today.definition();
    if (nbjMini)today.ajoutJour(nbjMini);
    for (var i = 0; i < jourArr.length; i++) {
        for (var j = 0; j < nb_stock; j++) {
            var code_stock = new String(tabStock[j].code);
            idCurr = idDivGene + "_id_" + dte.toString("ddmmyyyy") + "_" + code_stock.replace("/", "_slash_");
            if ($(idCurr)) {
                jr_arr = jourArr.charAt(i);
                if ($(idCurr).hasClassName("classeInit") && jr_arr == "A") {
                    if ((apresToday && dte.estApresOBJDate(today)) || !apresToday) {
                        $(idCurr).addClassName("spanCalendCliquableGP");
                        $(idCurr).onclick = function (evt) {
                            calendrier_clicDateGP(evt, this, request);
                        }
                    }
                } else {
                    if (jr_arr != "A" && $(idCurr).hasClassName("spanCalendCliquableGP")) {
                        $(idCurr).removeClassName("spanCalendCliquableGP");
                        $(idCurr).onclick = null;
                    }
                }
                if ($(idCurr).hasClassName("classeInit"))$(idCurr).removeClassName("classeInit");
            }
        }
        dte.ajoutJour(1);
    }
}
function calendrier_getClassForJourGP(etat, request, cliquable) {
    var classEtat;
    var tabClass = calendrier_getTabClassEtatsGP(request);
    var classe = "spanCalendJourGP_" + tabClass.getEtatLong(etat);
    if (cliquable && (etat == "1" || (etat == "0" && request == "O")))classe += " spanCalendCliquableGP";
    return classe;
}
function calendrier_getTabClassEtatsGP(request) {
    var tabClass = {
        "getEtatLong": function (etat) {
            switch (etat) {
                case"1":
                    return "libre";
                case"0":
                    if (request == "O")return "devis"; else return "occupe";
            }
        }
    };
    return tabClass;
}
function calendrier_clicDateGP(evt, obj, request) {
    var tabClass = calendrier_getTabClassEtatsGP(request);
    var etat = tabClass.getEtatLong(obj.getAttribute("etat"));
    var idCurr = new String(obj.id);
    idCurr = idCurr.replace("_slash_", "/");
    var tabId = idCurr.split("_");
    var chaine = new String(tabId[tabId.length - 2]);
    var jour = chaine.substr(0, 2);
    var mois = chaine.substr(2, 2);
    var annee = chaine.substr(4, 4);
    obj.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.foncQdClicGauche(evt, jour, mois, annee, etat);
}
jQuery(document).ready(function () {
    if (jQuery(".div_fiche_calendrierDispoPHP").length > 0) {
        lanceCalendrier();
        if (jQuery(".div_fiche_calendrierDispo_detailCH").attr('data-gite')) {
            jQuery(".div_fiche_calendrierDispo_detailCH").css('cursor', 'pointer');
            jQuery(".div_fiche_calendrierDispo_detailCH").bind('click', function () {
                var myElement = jQuery(".div_fiche_calendrierDispo_detailCH");
                if (myElement.parent().children(".div_fiche_calendrierDispoLIGNE").is(':visible')) {
                    myElement.parent().children(".div_fiche_calendrierDispoLIGNE").hide();
                    myElement.parent().children(".div_fiche_calendrierDispoCARRE").show();
                    jQuery(".div_fiche_calendrierDispo_detailCH").html(jQuery(".div_fiche_calendrierDispo_detailCH").attr('data-ch'))
                } else {
                    myElement.parent().children(".div_fiche_calendrierDispoCARRE").hide();
                    myElement.parent().children(".div_fiche_calendrierDispoLIGNE").show();
                    jQuery(".div_fiche_calendrierDispo_detailCH").html(jQuery(".div_fiche_calendrierDispo_detailCH").attr('data-gite'))
                }
            })
        }
        if (jQuery("#div_fiche_btnDispo").length > 0) {
            jQuery("#div_fiche_btnDispo a").removeAttr('onclick');
            jQuery("#div_dispo").hide();
            jQuery("#div_dispo").slideUp();
            jQuery("#div_fiche_btnDispo a").bind('click', function () {
                if (jQuery("#div_dispo").is(':visible')) {
                    jQuery("#div_dispo").slideUp();
                } else {
                    jQuery("#div_dispo").slideDown();
                }
            })
        }
    }
});
function lanceCalendrier(maDiv) {
    if (maDiv)maDiv = "#" + maDiv; else maDiv = ".div_dispos_showing";
    if (jQuery(maDiv).length == 0)maDiv = ".calendIteaAvSaison";
    if (jQuery(maDiv).length <= 1) {
        var modeCalendrierMultiple = false;
    } else {
        var modeCalendrierMultiple = true;
    }
    var nbMois = jQuery(maDiv).attr('nbmois');
    if (!nbMois && jQuery(".div_btnsGauche"))nbMois = "12";
    jQuery(maDiv + " .calendItea_navigGauche").css("cursor", "pointer");
    jQuery(maDiv + " .calendItea_navigDroite").css("cursor", "pointer");
    if (jQuery(maDiv + " .div_fiche_calendrierDispo").children(".calendItea_listMois").find('li:first-child').attr("data-estaffiche") == "true") {
        if (jQuery(maDiv + " .calendItea_navigGauche").children('a').length > 0)jQuery(maDiv + " .calendItea_navigGauche a").hide()
        else if (jQuery(maDiv + " a.calendItea_navigGauche").length > 0)jQuery(maDiv + " a.calendItea_navigGauche").hide()
        else jQuery(maDiv + " .calendItea_navigGauche").hide()
    }
    if (jQuery(maDiv + " .div_fiche_calendrierDispo").children(".calendItea_listMois").find('li:eq(' + (parseInt(nbMois)) + ')').length == 0) {
        jQuery(maDiv + " .calendItea_navigDroite").hide()
    }
    jQuery(maDiv + " .calendItea_navigGauche").bind('click', function () {
        if (jQuery(this).children('a').is(':visible') || (jQuery(this).is(':visible') && jQuery(this).children('a').length === 0)) {
            if (!modeCalendrierMultiple) {
                var madivCurrent = jQuery(maDiv);
            } else {
                var madivCurrent = jQuery(this).parent(maDiv);
            }
            var elementFirstPositionToShow = jQuery(madivCurrent).find(" .div_fiche_calendrierDispo").children(".calendItea_listMois").find('li:visible')[0];
            elementFirstPositionToShow = parseInt(jQuery(elementFirstPositionToShow).index());
            var elementFirstPositionToHide = parseInt(elementFirstPositionToShow) + parseInt(nbMois);
            for (var i = -parseInt(nbMois); i < 0; i++) {
                if (jQuery(madivCurrent).find(" .div_fiche_calendrierDispo").children(".calendItea_listMois").find('li:eq(' + (elementFirstPositionToShow + i) + ')').length > 0) {
                    jQuery(madivCurrent).find(" .div_fiche_calendrierDispo").children(".calendItea_listMois").find('li:eq(' + (elementFirstPositionToShow + i) + ')').show();
                }
                jQuery(madivCurrent).find(" .div_fiche_calendrierDispo").children(".calendItea_listMois").find('li:eq(' + (elementFirstPositionToHide + i) + ')').hide();
            }
            jQuery(madivCurrent).find(" .calendItea_navigDroite").show();
            jQuery(madivCurrent).find(" .calendItea_navigDroite a").show();
            if (elementFirstPositionToShow <= nbMois) {
                if (jQuery(this).parent().children(maDiv + " .calendItea_navigGauche").children('a').length > 0) {
                    jQuery(this).children('a').hide();
                    jQuery(this).hide();
                } else {
                    jQuery(this).parent().children(maDiv + " a.calendItea_navigGauche").hide();
                    jQuery(this).parent().children(maDiv + " .calendItea_navigGauche").hide();
                }
            }
            if (jQuery(maDiv + " .calendItea_navigEtCalend")) {
                var anneeActu = jQuery(maDiv + " .calendItea_navigEtCalend [class=annee1]").html();
                var annee1 = parseInt(anneeActu) - 1;
                var annee0 = parseInt(annee1) - 1;
                var annee2 = parseInt(annee1) + 1;
                jQuery(maDiv + " .calendItea_navigEtCalend [class=annee0]").html(annee0);
                jQuery(maDiv + " .calendItea_navigEtCalend [class=annee1]").html(annee1);
                jQuery(maDiv + " .calendItea_navigEtCalend [class=annee2]").html(annee2);
            }
        }
    });
    jQuery(maDiv + " .calendItea_navigDroite").bind('click', function () {
        if (jQuery(this).children('a').is(':visible') || (jQuery(this).is(':visible') && jQuery(this).children('a').length === 0)) {
            if (!modeCalendrierMultiple) {
                var madivCurrent = jQuery(maDiv);
            } else {
                var madivCurrent = jQuery(this).parent(maDiv);
            }
            var elementFirstPositionToHide = jQuery(madivCurrent).find(".div_fiche_calendrierDispo").children(".calendItea_listMois").find('li:visible')[0];
            elementFirstPositionToHide = parseInt(jQuery(elementFirstPositionToHide).index());
            var elementFirstPositionToShow = parseInt(elementFirstPositionToHide) + parseInt(nbMois);
            for (var i = 0; i < parseInt(nbMois); i++) {
                if (jQuery(madivCurrent).find(" .div_fiche_calendrierDispo").children(".calendItea_listMois").find('li:eq(' + (elementFirstPositionToShow + i) + ')').length > 0) {
                    jQuery(madivCurrent).find(" .div_fiche_calendrierDispo").children(".calendItea_listMois").find('li:eq(' + (elementFirstPositionToShow + i) + ')').show();
                }
                jQuery(madivCurrent).find(" .div_fiche_calendrierDispo").children(".calendItea_listMois").find('li:eq(' + (elementFirstPositionToHide + i) + ')').hide();
            }
            jQuery(madivCurrent).find(" .calendItea_navigGauche a").css("display", "block");
            jQuery(madivCurrent).find(" .calendItea_navigGauche").show();
            if ((elementFirstPositionToShow + i) >= parseInt(jQuery(this).parent().children(maDiv + " .div_fiche_calendrierDispoCARRE").children(".calendItea_listMois").children("ul").children("li").size())) {
                if (jQuery(this).children("a").length > 0) {
                    jQuery(this).children("a").hide();
                }
                jQuery(this).hide();
            }
            if (jQuery(maDiv + " .calendItea_navigEtCalend")) {
                var anneeActu = jQuery(maDiv + " .calendItea_navigEtCalend [class=annee1]").html();
                var annee1 = parseInt(anneeActu) + 1;
                var annee0 = parseInt(annee1) - 1;
                var annee2 = parseInt(annee1) + 1;
                jQuery(maDiv + " .calendItea_navigEtCalend [class=annee0]").html(annee0);
                jQuery(maDiv + " .calendItea_navigEtCalend [class=annee1]").html(annee1);
                jQuery(maDiv + " .calendItea_navigEtCalend [class=annee2]").html(annee2);
            }
        }
    });
    if (jQuery(maDiv + " caption").length > 0) {
        jQuery(maDiv + " caption").live('click', function () {
            var typeProd = jQuery(maDiv + " [class=annee1]").attr('data-type');
            if ((typeProd == "G" || typeProd == "H") && jQuery(this).closest(maDiv).hasClass('calendIteaAvSaison')) {
                var ident = (jQuery(maDiv + " [class=annee1]").attr('data-ident'));
                var moisCurr = jQuery(this).attr('data-mois');
                var anneeCurr = jQuery(this).attr('data-annee');
                afficheDivAvecTransparence(calendrier_getXHTML_1mois_saison(moisCurr, anneeCurr, "fr", "saisons", "", ident), 250, 180, "sais");
                var url = "/lib_2/ajax/contenuFenetre.php";
                var vars = "element=elemObjProd&typeInfo=afficheTarifParSaison-" + ident + "-" + moisCurr + "-" + anneeCurr;
                affUrlInDiv("div_tarifSais", url, vars, "aucun", majIdSaisonForUnMois);
            }
        });
    }
    if (jQuery(maDiv).parent().find(".ficheSelectDisposBychmb").length > 0) {
        jQuery(maDiv).parent().find(".ficheSelectDisposBychmb").bind('change', function () {
            showDisposChambre(this);
        });
        jQuery.each(jQuery(maDiv).parent().find(".ficheSelectDisposBychmb"), function () {
            if (jQuery(this).attr('data-valuedefaut') != '0') {
                jQuery(this).trigger('change')
            }
        })
    }
}
function showDisposChambre(selectElement) {
    var classe_a_afficher = jQuery('option:selected', selectElement).attr('data-classe_a_afficher');
    jQuery(selectElement).parent().find(".calendItea_ul_CARRE td").children("span").css('display', 'none');
    jQuery(selectElement).parent().find(".calendItea_ul_CARRE td").children("a").css('display', 'none');
    jQuery(selectElement).parent().find(".calendItea_ul_CARRE td").children('.' + classe_a_afficher).css('display', 'block');
    jQuery(selectElement).parent().find(".calendItea_ul_CARRE td").children('.' + classe_a_afficher).children().css('display', 'block');
}
function calendrierPHP_getXHTMLForAfficheInDivAvecTransparence(nomdiv, ident, titreDivResa, typegite) {
    var html;
    window.nomDivResaPopIn = titreDivResa;
    html = "<div class='calendIteaBtFermer' id='div_planningBtFermer_calendItea_" + nomdiv + "' onclick=effaceDivAvecTransparence();>Fermer</div>";
    var htmlBase = "<div class='calendIteaBtFermer' id='div_planningBtFermer_calendItea_" + nomdiv + "' onclick=effaceDivAvecTransparence();>Fermer</div>";
    html = htmlBase + "<img src='/config_v3/imgs_defaut/v5/ajax-loader.gif' alt='Chargement en cours...' />";
    var url = "/lib_2/ajax/infosDist.php";
    var vars = "info=DISPOSxHTML&ident=" + ident + "&type_gite=" + typegite;
    var xhr_local = creeObjHttpRequest();
    xhr_local.onreadystatechange = function () {
        if (xhr_local.readyState == 4 && xhr_local.status == 200) {
            var contenu = xhr_local.responseText;
            $("divGraph_fenetre").innerHTML = htmlBase + contenu;
            lanceCalendrier("calendrierAnnuel");
        }
    }
    xhr_local.open("POST", url, true);
    xhr_local.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr_local.send(vars);
    return html;
}
function calendrierPHP_chargerEnAjax(instance, reference) {
    if ($("calendrierPHP_Ajax_" + instance + "_" + reference)) {
        var idDiv = $("calendrierPHP_Ajax_" + instance + "_" + reference).getAttribute("data-iddiv");
        if (!$(idDiv)) {
            var nomClass = $("calendrierPHP_Ajax_" + instance + "_" + reference).getAttribute("data-class");
            var nbMois = $("calendrierPHP_Ajax_" + instance + "_" + reference).getAttribute("data-nbmois");
            var suffixeId = $("calendrierPHP_Ajax_" + instance + "_" + reference).getAttribute("data-suffixeId");
            var ident = $("calendrierPHP_Ajax_" + instance + "_" + reference).getAttribute("data-ident");
            var typegite = $("calendrierPHP_Ajax_" + instance + "_" + reference).getAttribute("data-typeGite");
            var ope = $("calendrierPHP_Ajax_" + instance + "_" + reference).getAttribute("data-ope");
            var url = "/lib_2/ajax/infosDist.php";
            var vars = "info=DISPOSxHTMLauMois&ident=" + ident + "&type_gite=" + typegite + "&nbMois=" + nbMois + "&idDiv=" + idDiv + "&classDiv=" + nomClass + "&ope=" + ope + "&suffixeId=" + suffixeId
            var xhr_local = creeObjHttpRequest();
            xhr_local.onreadystatechange = function () {
                if (xhr_local.readyState == 4 && xhr_local.status == 200) {
                    var contenu = xhr_local.responseText;
                    $("calendrierPHP_Ajax_" + instance + "_" + reference).innerHTML = contenu;
                    lanceCalendrier(idDiv);
                }
            }
            xhr_local.open("POST", url, true);
            xhr_local.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr_local.send(vars);
        }
    }
}
function creeObjHttpRequest() {
    var xhr_local = null;
    if (window.XMLHttpRequest)
        xhr_local = new XMLHttpRequest(); else if (window.ActiveXObject) {
        try {
            xhr_local = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            xhr_local = new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    return xhr_local;
}
function go(c) {
    if (!c.data.replace(/\s/g, ""))
        c.parentNode.removeChild(c);
}
function clean(d) {
    var bal = d.getElementsByTagName("*");
    for (i = 0; i < bal.length; i++) {
        a = bal[i].previousSibling;
        if (a && a.nodeType == 3)
            go(a);
        b = bal[i].nextSibling;
        if (b && b.nodeType == 3)
            go(b);
    }
    return d;
}
function urlCentreByAjaxFromCGI(url, cgis, htmlAttente) {
    var xhr_local = creeObjHttpRequest();
    if (htmlAttente)var objMsg = getDivSurPageWithHtml(htmlAttente);
    xhr_local.onreadystatechange = function () {
        if (xhr_local.readyState == 4 && xhr_local.status == 200) {
            var contenuVisuStruct = xhr_local.responseText;
            var xhr_head = creeObjHttpRequest();
            xhr_head.onreadystatechange = function () {
                if (xhr_head.readyState == 4 && xhr_head.status == 200) {
                    var contenuHead = xhr_head.responseText;
                    document.getElementsByTagName("head").item(0).innerHTML = contenuHead;
                    document.getElementById("page").innerHTML = contenuVisuStruct;
                    effaceDivSurPage();
                }
            }
            xhr_head.open("POST", "/lib/ajax/contenuFenetre.php", true);
            xhr_head.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr_head.send("typeInfo=HEAD");
        }
    }
    xhr_local.open("POST", url, true);
    xhr_local.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr_local.send(cgis + "&JUSTE_LE_CENTRE=JLC");
}
function listeByAjaxFromCGI(cgis, htmlAttente) {
    urlCentreByAjaxFromCGI("/liste", cgis, htmlAttente);
}
function listeByAjaxFromForm(idForm, htmlAttente) {
    var objForm = document.getElementById(idForm);
    if (!objForm)return;
    var tabForm = getTabChmpForm(objForm);
    var query = "";
    for (var i = 0; i < tabForm.length; i++) {
        query += "&" + tabForm[i].id + "=" + tabForm[i].value;
    }
    urlCentreByAjaxFromCGI("/liste", query, htmlAttente);
}
function urlDsPageCurrByAjaxAvecMsgAttente(url, cgi, htmlAttente) {
}
function affUrlInDiv(nomDiv, url, vars, msgAttente, foncQdFini) {
    var idx = url.indexOf("?");
    if (idx > 0) {
        vars += url.substr(idx + 1);
        url = url.substr(0, idx);
    }
    vars += getInfoSession("PHPSESSID");
    var xhr_local = creeObjHttpRequest();
    xhr_local.onreadystatechange = function () {
        if (xhr_local.readyState == 4 && xhr_local.status == 200) {
            var reponse = xhr_local.responseText;
            var elem = $(nomDiv);
            if (elem)elem.innerHTML = reponse;
            if (foncQdFini)foncQdFini(elem);
        }
        if (xhr_local.readyState == 4 && xhr_local.status != 200) {
            if (foncQdFini)foncQdFini(elem);
        }
    }
    if (msgAttente != "aucun") {
        var elem = document.getElementById(nomDiv);
        if (elem && msgAttente)elem.innerHTML = msgAttente; else affMsgAttenteInDiv(nomDiv);
    }
    xhr_local.open("POST", url, true);
    xhr_local.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr_local.send(vars);
}
function affUrlInDivFromHtml(html, foncQdFini) {
    var data = html;
    var idx_debhtml = data.indexOf("-->");
    if (idx_debhtml > 0) {
        var js = data.substr(4, idx_debhtml - 4);
        if (js.substr(0, 14) == "JS_affUrlInDiv") {
            var tabInfos = js.split("&#164;");
            affUrlInDiv(tabInfos[1], tabInfos[2], tabInfos[3], "", foncQdFini);
        } else {
            if (window.foncQdFini)window.foncQdFini(false);
        }
    }
}
function affUrlSsTourInDivAvecMsgAttente(nomDiv, url, query_string, html_attente) {
    var xhr_local = creeObjHttpRequest();
    xhr_local.onreadystatechange = function () {
        if (xhr_local.readyState == 4 && xhr_local.status == 200) {
            var contenu = xhr_local.responseText;
            document.getElementById(nomdiv).innerHTML = contenu;
        }
    }
    xhr_local.open("POST", url, true);
    xhr_local.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr_local.send(query_string);
}
function chargeAdresseHTMLDansDiv(nomdiv, url, query_string) {
    var xhr_local = creeObjHttpRequest();
    xhr_local.onreadystatechange = function () {
        if (xhr_local.readyState == 4 && xhr_local.status == 200) {
            var contenu = xhr_local.responseText;
            document.getElementById(nomdiv).innerHTML = contenu;
        }
    }
    xhr_local.open("POST", url, true);
    xhr_local.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr_local.send(query_string);
}
function appelAjaxToFunc(url, query_string, foncQdFini) {
    var xhr_local = creeObjHttpRequest();
    xhr_local.onreadystatechange = function () {
        if (xhr_local.readyState == 4 && xhr_local.status == 200) {
            var contenu = xhr_local.responseText;
            if (foncQdFini)foncQdFini(contenu);
        }
    }
    xhr_local.open("POST", url, true);
    xhr_local.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr_local.send(query_string);
}
function appelAjaxXMLToFunc(url, query_string, foncQdFini) {
    var xhr_local = creeObjHttpRequest();
    xhr_local.onreadystatechange = function () {
        if (xhr_local.readyState == 4 && xhr_local.status == 200) {
            var contenu = clean(xhr_local.responseXML.documentElement);
            if (foncQdFini)foncQdFini(contenu);
        }
    }
    xhr_local.open("POST", url, true);
    xhr_local.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr_local.send(query_string);
}
function appelAdrAjaxInDivAvecTransparence(adr, sending, msg, w, h, effacerDivChargementApresReponse, foncQdFini) {
    var html_init = "<div id='divChargementAjx'><div class='divChargementAjxContent'<img src=/config_v3/imgs_defaut/loading/roue16x16.gif /><br />" + msg + "</div></div>";
    if (!w)w = 200;
    if (!h)h = 150;
    afficheDivAvecTransparence(html_init, w, h);
    var objStatus = document.getElementById("divChargementAjx");
    var xhr_local = creeObjHttpRequest();
    xhr_local.onreadystatechange = function () {
        if (xhr_local.readyState == 4 && xhr_local.status == 200) {
            reponse = xhr_local.responseText;
            if (effacerDivChargementApresReponse)afficheDivAvecTransparence(reponse, w, h); else objStatus.innerHTML = reponse;
            if (foncQdFini)foncQdFini();
        }
    }
    xhr_local.open("POST", adr, true);
    xhr_local.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr_local.send(sending);
}
function appelCalendrierAnnuelGP(adr, sending, msg, w, h) {
    appelAdrAjaxInDivAvecTransparence(adr, sending, msg, w, h, true, initCalendrierAnnuelGP);
}
function affParamCGICurrInObjById(idDiv, param, acc, chaineAvant, chaineApres) {
    var obj = document.getElementById(idDiv);
    if (obj) {
        var url = "/lib/ajax/infosCGI.php";
        var vars = "typeInfo=" + param + "&val=" + acc;
        vars += getInfoSession("PHPSESSID");
        var xhr_local = creeObjHttpRequest();
        xhr_local.onreadystatechange = function () {
            if (xhr_local.readyState == 4 && xhr_local.status == 200) {
                var reponse = new String(xhr_local.responseText);
                var ch = "";
                if (reponse.length > 0) {
                    if (chaineAvant)ch = chaineAvant;
                    ch = ch + reponse;
                    if (chaineApres)ch = ch + chaineApres;
                    obj.innerHTML = ch;
                }
            }
        }
        obj.innerHTML = "<img src=/config_v3/imgs_defaut/chargement_3Points.gif id=imgChargementAffParamCGI width=10/>";
        xhr_local.open("POST", url, true);
        xhr_local.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr_local.send(vars);
    }
}
function setCGIByAjax(querystring, rechargeListe, foncQdFini, paramFcQdFini) {
    var url = "/lib/ajax/setInfosCgi.php";
    var vars = "query_string=" + escape(querystring);
    if (rechargeListe)vars += "&reloadList=O";
    vars += getInfoSession("PHPSESSID");
    var xhr_local = creeObjHttpRequest();
    xhr_local.onreadystatechange = function () {
        if (xhr_local.readyState == 4 && xhr_local.status == 200) {
            var reponse = new String(xhr_local.responseText);
            if (foncQdFini && paramFcQdFini)foncQdFini(reponse == "OK", paramFcQdFini); else if (foncQdFini)foncQdFini(reponse == "OK");
        }
    }
    xhr_local.open("POST", url, true);
    xhr_local.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr_local.send(vars);
}
function chargeMotCleDsDiv(idDiv, motCle) {
    if (!window.jsonMotcle)window.jsonMotcle = [];
    for (var i = 0; i < window.jsonMotcle.length; i++) {
        if (window.jsonMotcle[i].motcle == motCle) {
            if ($(idDiv))$(idDiv).innerHTML = window.jsonMotcle[i].content;
            return;
        }
    }
    var adr = "/lib_2/ajax/contenuFenetre.php";
    var sending = getInfoSession() + "&element=motCle&typeInfo=motcle&val=" + motCle;
    appelAjaxToFunc(adr, sending, function (reponse) {
        window.jsonMotcle.push({'motcle': motCle, 'content': reponse});
        window.jsonMotcle.uniq();
        if ($(idDiv))$(idDiv).innerHTML = reponse;
    });
}
function cleanAllAJAXcall() {
}
function appelAdrAjaxToFuncXMLAvecAttente(url, query_string, foncQdFini, msg, w, h) {
    if (!msg) {
        var msg = 'Chargement en cours';
    }
    var html_init = "<div id='divChargementAjx'><img src=/config_v3/imgs_defaut/loading/roue16x16.gif /><br />" + msg + "</div>";
    if (!w)w = 200;
    if (!h)h = 150;
    afficheDivAvecTransparence(html_init, w, h);
    (function ($) {
        $.ajax({
            type: "POST", url: url, data: query_string, dataType: 'xml', success: function (reponse) {
                $('#divChargementAjx').hide('slow');
                if (foncQdFini)foncQdFini(reponse);
            }
        });
    })(jQuery);
}
function simpleUploaderAjax(form, fonctionSuccess) {
    (function ($) {
        $(form).submit(function (event) {
            event.stopPropagation();
            event.preventDefault();
            var files = $('input[type=file]', form)[0].files;
            var data = new FormData();
            $.each(files, function (key, value) {
                data.append(key, value);
            });
            var queryString = '?' + $(form).serialize();
            $.ajax({
                url: $(form).attr('action') + queryString,
                type: 'POST',
                data: data,
                cache: false,
                dataType: 'json',
                processData: false,
                contentType: false,
                success: function (data, textStatus, jqXHR) {
                    if (data.code == 'OK') {
                        window[fonctionSuccess](data);
                    }
                    else {
                    }
                    $('.spinnerAppelAjax', form).remove();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $('.spinnerAppelAjax', form).remove();
                },
                beforeSend: function () {
                    $(form).append('<img class="spinnerAppelAjax" src=/config_v3/imgs_defaut/loading/roue16x16.gif />');
                }
            });
        });
    })(jQuery);
}
var nbChampVerifie;
function getVersionIE() {
    if (!(navigator.appName == 'Microsoft Internet Explorer')) {
        return 999;
    } else {
        var ua = navigator.userAgent;
        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null) {
            return parseFloat(RegExp.$1);
        }
    }
    return 999;
}
function format_nb(valeur, decimal, separateur) {
    var deci = Math.round(Math.pow(10, decimal) * (Math.abs(valeur) - Math.floor(Math.abs(valeur))));
    var val = Math.floor(Math.abs(valeur));
    if ((decimal == 0) || (deci == Math.pow(10, decimal))) {
        val = Math.floor(Math.abs(valeur));
        deci = 0;
    }
    var val_format = val + "";
    var nb = val_format.length;
    for (var i = 1; i < 4; i++) {
        if (val >= Math.pow(10, (3 * i))) {
            val_format = val_format.substring(0, nb - (3 * i)) + separateur + val_format.substring(nb - (3 * i));
        }
    }
    if (decimal > 0) {
        var decim = "";
        for (var j = 0; j < (decimal - deci.toString().length); j++) {
            decim += "0";
        }
        deci = decim + deci.toString();
        val_format = val_format + "." + deci;
    }
    if (parseFloat(valeur) < 0) {
        val_format = "-" + val_format;
    }
    return val_format;
}
function setWindowForInclude() {
    window.tabFileForInclude = new Array();
    window.tabFileOfInclude = new Array();
    window.tabFileForInclude[0] = "/lib_2/js/foncs/test.js";
}
function execute(nom_function) {
    window.tabFileForInclude.each(function (file) {
        if (!in_array(window.tabFileOfInclude, nom_function)) {
            var res = include(file, "body", nom_function, nom_function);
            if (res) {
                window.tabFileOfInclude[window.tabFileOfInclude.length + 1] = file;
                window.foncQdLoaded();
            }
        }
    });
}
function include(fileName, typeBaliseToAdd, nomFoncToCheck, foncQdLoaded) {
    var retour = false;
    var objToAdd;
    if (!typeBaliseToAdd)typeBaliseToAdd = "head";
    if (document.getElementsByTagName)objToAdd = document.getElementsByTagName(typeBaliseToAdd); else if (document.$$)objToAdd = $$(typeBaliseToAdd);
    if (objToAdd) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = fileName;
        objToAdd[0].appendChild(script);
    }
    if (nomFoncToCheck) {
        var ok = false;
        eval("ok=window." + nomFoncToCheck);
        var rep = window.test;
        rep = window.addfavoris;
        if (ok) {
            retour = true;
        }
        else {
            window.optsForInclude = {};
            window.optsForInclude.fileName = fileName;
            window.optsForInclude.foncQdLoaded = foncQdLoaded;
            window.optsForInclude.nomFoncToCheck = nomFoncToCheck;
            window.optsForInclude.intervForInclude = setInterval(function () {
                eval("ok=window." + window.optsForInclude.nomFoncToCheck);
                if (ok) {
                    clearInterval(window.optsForInclude.intervForInclude);
                    window.optsForInclude.foncQdLoaded();
                    retour = true;
                }
            }, 500);
        }
    }
    return retour;
}
function in_array(array, p_val) {
    for (var i = 0, l = array.length; i < l; i++) {
        if (array[i] == p_val) {
            rowid = i;
            return true;
        }
    }
    return false;
}
function is_array(input) {
    return (typeof(input) == 'object' && (input instanceof Array));
}
function array_push(array, vars) {
    if (!is_array(array))array = new Array();
    var length = array.length;
    array[length] = vars;
    return array;
}
function addfavoris(url, title) {
    if (!url) {
        if (document.documentURI)url = document.documentURI; else url = document.location;
    }
    if (!title)title = document.title;
    if (navigator.userAgent.indexOf('Safari') != -1) {
        if (navigator.appVersion.indexOf("Mac", 0) > 0)alertAMalibu("Utilisez POMME + D \n pour ajouter " + title + " dans vos favoris"); else alertAMalibu("Utilisez CTRL + D \n pour ajouter " + title + " dans vos favoris");
    }
    if (getVersionIE() < 9 && window.external)window.external.AddFavorite(url, title); else if (window.sidebar.addPanel)window.sidebar.addPanel(title, url, "");
}
function printContentObj(obj) {
    var links = "";
    var objLinks = document.getElementsByTagName('link');
    for (var i = 0; i < objLinks.length; i++) {
        links += "<link rel='stylesheet' media='" + objLinks[i].getAttribute("media") + "' href='" + objLinks[i].getAttribute("href") + "' />";
    }
    var contentFrame = "<html><head>" + links + "</head><body>" + jQuery(obj).html() + "</body></html>";
    var windowToPrint = window.open("", "windowToPrint");
    windowToPrint.document.open();
    windowToPrint.document.write(contentFrame);
    windowToPrint.document.close();
    windowToPrint.print();
    windowToPrint.close();
}
function reloadJs() {
    var i, a, s;
    a = document.getElementsByTagName('script');
    for (i = 0; i < a.length; i++) {
        s = a[i];
        if (s.type.toLowerCase().indexOf('text/javascript') >= 0 && s.src) {
            var h = s.src.replace(/(&|%5C?)reload=\d+/, '');
            s.src = h + (h.indexOf('?') >= 0 ? '&' : '?') + 'reload=' + getUniqueId();
        }
    }
}
function gaTrack(url) {
    if (window.pageTracker)window.pageTracker.push(['_trackPageview', url]);
    if (window.pageTrackerItea)window.pageTrackerItea.push(['_trackPageview', url]);
}
function gTracking_addTrans(numero_resa, affiliation, prix_total, prix_taxes, prix_expedition, ville, region, pays) {
    if (window.pageTracker)
        window.pageTracker.push(['_addTrans', numero_resa, affiliation, prix_total, prix_taxes, prix_expedition, ville, region, pays]);
}
function gTracking_addItem(numero_resa, code_prod, nom_prod, categorie_prod, prix_unit, quantite) {
    if (window.pageTracker)
        window.pageTracker.push(['_addItem', numero_resa, code_prod, nom_prod, categorie_prod, prix_unit, quantite]);
}
function gTracking_trackTrans() {
    if (window.pageTracker)window.pageTracker.push(['_trackTrans']);
}
function gTracking_conversionPage(id, langue, format, color, label, mntTotal) {
    if (id) {
        var google_conversion_id = id;
        var google_conversion_language = langue;
        var google_conversion_format = format;
        var google_conversion_color = color;
        var google_conversion_label = label;
        if (mntTotal) {
            var google_conversion_value = mntTotal;
        }
        include("http://www.googleadservices.com/pagead/conversion.js", "body");
    }
}
function initSiteWeb() {
    afficheListeByAjx_setTri_bySelect();
    initChangeNombreElementParPage();
    moteur_initMoteurCommun();
    if (window.oninit)oninit();
    if (window.oninit1)oninit1();
    if (window.oninit2)oninit2();
    if (window.oninit3)oninit3();
    initAfficheMasqueTexteEntetePage();
    checkPageSiDivForChargePrixInLst();
    traiteInformationInfosBulle();
    verifNavigateur();
    setActionSurDiaporama();
    initClicBody();
    if (jQuery(".a_canevasAfficheDetail").length > 0) {
        jQuery(".a_canevasAfficheDetail").fancybox({
            maxWidth: 800,
            maxHeight: 600,
            fitToView: false,
            width: '70%',
            height: '70%',
            autoSize: false,
            closeClick: false,
            openEffect: 'none',
            closeEffect: 'none'
        });
    }
    if (jQuery("a.itea_colorbox").length > 0) {
        jQuery("a.itea_colorbox").colorbox({maxHeight: '90%', maxWidth: '90%'});
    }
    if (jQuery('.flash_player').length > 0) {
        jQuery.each(jQuery('.flash_player'), function () {
            jQuery(this).flash(jQuery(this).attr('data-src'));
        })
    }
    if (jQuery('.viewWithQtip').length > 0) {
        jQuery('.viewWithQtipTohide').hide();
        jQuery('.viewWithQtip').each(function () {
            if (jQuery(this).attr('data-qhelp') && jQuery("#" + jQuery(this).attr('data-qhelp'))) {
                switch (jQuery(this).attr('data-qposition')) {
                    case'hautgauche':
                        positionmy = 'bottom right';
                        positionat = 'top left';
                        break;
                    case'hautdroite':
                        positionmy = 'bottom left';
                        positionat = 'top right';
                        break;
                    case'bas':
                        positionmy = 'top center';
                        positionat = 'bottom center';
                        break;
                    case'centredroite':
                        positionmy = 'center left';
                        positionat = 'center right';
                        break;
                    case'centregauche':
                        positionmy = 'center right';
                        positionat = 'center left';
                        break;
                    default:
                        positionmy = 'top left';
                        positionat = 'bottom right';
                        break;
                }
                jQuery(this).qtip({
                    content: {
                        text: jQuery("#" + jQuery(this).attr('data-qhelp')).html(),
                        title: {text: jQuery(this).attr('data-qtitle')}
                    }, position: {my: positionmy, at: positionat}, show: 'mouseover', hide: 'mouseout'
                })
            }
        })
    }
    if (jQuery('.viewWithQtipBottomRight').length > 0) {
        jQuery('.viewWithQtipTohide').hide()
        jQuery('.viewWithQtipBottomRight').each(function () {
            if (jQuery(this).attr('data-qhelp') && jQuery("#" + jQuery(this).attr('data-qhelp'))) {
                jQuery(this).qtip({
                    content: {
                        text: jQuery("#" + jQuery(this).attr('data-qhelp')).html(),
                        title: {text: jQuery(this).attr('data-qtitle')}
                    }, position: {my: 'top right', at: 'bottom right'}, show: 'mouseover', hide: 'mouseout'
                })
            }
        })
    }
    if (jQuery('.lst_multiple').length > 0) {
        jQuery(".lst_multiple").chosen({
            no_results_text: "Aucun résultat",
            allow_single_deselect: true
        }).change(function () {
            if (jQuery("#moteur_selectRayon")) {
                var value = jQuery(this).val();
                tabValue = value.split("-");
                if (tabValue[0].substr(0, 5) == "INSEE") {
                    jQuery("#moteur_selectRayon").attr("disabled", false);
                }
                if (tabValue[1]) {
                    tabValue2 = tabValue[1].split("_");
                    if (tabValue2[0] == "DISTCOMM") {
                        if (tabValue2[1]) {
                            jQuery("#moteur_selectRayon").val(tabValue2[1]);
                        } else {
                            jQuery("#moteur_selectRayon").val("10");
                        }
                    }
                }
            }
        });
    }
    if (jQuery("input[data-valueDefaut]").length > 0) {
        jQuery("input[data-valueDefaut]").bind("focus", function () {
            if (jQuery(this).val() == jQuery(this).attr("data-valueDefaut"))jQuery(this).val("");
        });
    }
    if (jQuery("input[data-valueDefaut]").length > 0) {
        jQuery("input[data-valueDefaut]").bind("blur", function () {
            if (jQuery(this).val() == "")jQuery(this).val(jQuery(this).attr("data-valueDefaut"));
        });
    }
    if (jQuery("*[data-href]").length > 0) {
        jQuery("*[data-href]").bind("click", function () {
            document.location.href = jQuery(this).attr("data-href");
        });
    }
    if (jQuery("*[data-href_parent]").length > 0) {
        jQuery("*[data-href_parent]").bind("click", function () {
            document.location.href = jQuery(this).attr("data-href_parent");
        });
    }
    if (jQuery("*[data-href-blank]").length > 0) {
        jQuery("*[data-href-blank]").bind("click", function () {
            window.open(jQuery(this).attr("data-href-blank"));
        });
    }
    if (jQuery("*[data-href_blank]").length > 0) {
        jQuery("*[data-href_blank]").bind("click", function () {
            window.open(jQuery(this).attr("data-href_blank"));
        });
    }
    if (jQuery('.div_disposProd').length > 0) {
        initCalendrierDisposGP();
    }
    (function ($) {
        if ($(".datepicker").length > 0) {
            var langue = initLangueForDatePicker();
            $.datepicker.setDefaults($.datepicker.regional[langue]);
            $(".datepicker").datepicker({minDate: 0, dateFormat: 'dd/mm/yy', firstDay: 1});
        }
    })(jQuery);
    initFancyBoxDeBase();
    if (jQuery("#recuperer_localisation").length > 0) {
        jQuery("#recuperer_localisation").bind("click", function () {
            jQuery("#recuperer_localisation").html("<img src='/config_v3/imgs_defaut/rouegrise.gif' alt='Rech. gps...' />");
            var gps = navigator.geolocation;
            if (gps) {
                gps.getCurrentPosition(recupPositionGps, function (error) {
                    erreurGPS()
                });
            }
            else {
                erreurRecupPositionGps()
            }
            return false
        });
    }
    if (jQuery.isFunction(window.initInscriptionNewsletter)) {
        initInscriptionNewsletter();
    }
    if (jQuery("#div_choixDates").length > 0) {
        if (jQuery('#div_choixDates').attr('data-ident')) {
            var tabParam = new Array();
            tabParam.ident = jQuery('#div_choixDates').attr('data-ident');
            tabParam.instance = jQuery('#div_choixDates').attr('data-instance');
            tabParam.exercice = jQuery('#div_choixDates').attr('data-exercice');
            tabParam.modefiche = true;
            afficherMasquerCalendrier(tabParam);
        }
    }
    if (jQuery("#div_formContactProp").length > 0) {
        initFormContactProp(null, jQuery("#inputIdentPourStat").val());
    }
    if (jQuery(".choixMoisPromos select").length > 0) {
        jQuery(".choixMoisPromos select").change(function () {
            if (jQuery(this).val() == '') {
                jQuery(this).parent().next('.ul_widgetPromo').children('li').show()
            } else {
                jQuery(this).parent().next('.ul_widgetPromo').children('li').hide()
                jQuery(this).parent().next('.ul_widgetPromo').children('li.' + jQuery(this).val()).show()
            }
        });
    }
}
function erreurRecupPositionGps() {
    jQuery("#recuperer_localisation").html(jQuery("#recuperer_localisation").attr('data-erreur'));
}
function recupPositionGps(position) {
    if (position) {
        jQuery("#recuperer_localisation").unbind()
        getNomLieuByPositionCurr(position, recupPositionGpsSetInfos);
        jQuery("#div_recuperer_localisation input[name=pos_gps_lat]").attr('value', position.coords.latitude);
        jQuery("#div_recuperer_localisation input[name=pos_gps_lng]").attr('value', position.coords.longitude);
    } else erreurRecupPositionGps()
}
function recupPositionGpsSetInfos(reponse) {
    var jsonarray = eval(reponse);
    jQuery("#div_recuperer_localisation input[name=pos_insee]").attr('value', jsonarray[0].insee);
    jQuery("#div_recuperer_localisation input[name=pos_ville]").attr('value', jsonarray[0].city);
    var cgiFinal = '';
    if (jQuery('.lst_multiple').length > 0) {
        var insee = jsonarray[0].insee;
        jQuery.each(jQuery('.lst_multiple'), function () {
            cgiFinal = 'INSEE_' + insee;
            jQuery(this).val(cgiFinal);
            if (jQuery(this).val() == '' || jQuery(this).val() == '%20' || jQuery(this).val() == undefined) {
                cgiFinal = 'INSEE_' + insee + '-DISTCOMM_10';
                jQuery(this).val('INSEE_' + insee + '-DISTCOMM_10');
            }
            if (jQuery(this).val() == '' || jQuery(this).val() == '%20' || jQuery(this).val() == undefined) {
                jQuery('#div_recuperer_localisation a').html(jQuery('#div_recuperer_localisation a').attr('data-nofound'))
                jQuery('#div_recuperer_localisation a').addClass('localisation_nok')
            } else {
                jQuery('#div_recuperer_localisation a').html(jsonarray[0].city)
                jQuery('#div_recuperer_localisation a').attr('href', 'liste.html?lieu=' + cgiFinal)
                jQuery('#div_recuperer_localisation a').attr('data-found', '1')
                jQuery('#div_recuperer_localisation a').addClass('localisation_ok')
                if (jQuery(this).hasClass('moteur_selectOnChange')) {
                    jQuery(this).trigger('change')
                } else if (jQuery(this).hasClass('lst_multiple')) {
                    jQuery(this).trigger('change');
                    jQuery(this).trigger("liszt:updated");
                }
            }
        })
    }
}
function initLangueForDatePicker() {
    (function ($) {
        var langueBody = $("body").attr("data-langue") || '';
        if (langueBody.length > 0 || $('#datalangue').length > 0) {
            if ($('#datalangue').length > 0) {
                lang = $('#datalangue').val();
            } else {
                lang = $("body").attr("data-langue");
            }
            switch (lang) {
                case'ANGLAIS':
                    lang = "en-GB";
                    break;
                case'ALLEMAND':
                    lang = "de";
                    break;
                case'HOLLANDAIS':
                case'NEERLANDAIS':
                    lang = "nl";
                    break;
                case'ITALIEN':
                    lang = "it";
                    break;
                case'ESPAGNOL':
                    lang = "es";
                    break;
                case'PORTUGAIS':
                    lang = "pt";
                    break;
                default:
                    lang = "fr";
            }
        }
        else {
            lang = $("html").attr("lang");
        }
        if (lang == undefined) {
            lang = "fr";
        }
    })(jQuery);
    return lang;
}
function initClicBody() {
    var zone = "init";
    jQuery(".ITEA_clicOutBody").each(function () {
        jQuery(this).bind("mouseout", function () {
            if (!jQuery(this).is(":hidden"))zone = "out";
        })
        jQuery(this).bind("mouseover", function () {
            if (!jQuery(this).is(":hidden"))zone = "in";
        })
    });
    jQuery("body").bind("click", function () {
        if (zone != "in" && zone != "init") {
            jQuery(".ITEA_clicOutBody").each(function () {
                if (jQuery(this).is(":visible")) {
                    jQuery(this).css("display", "none").removeClass("open");
                    zone = "init";
                }
            });
        }
        else if (zone == "init") {
            zone = "out";
        }
    });
}
function traitePanierGestprod() {
    if (jQuery('#div_liste_panierBasNonDate').length > 0) {
        (function ($) {
            $.ajax({
                type: "POST",
                url: "/resaGp/contenuPanierBoutique.php",
                data: {target: "_blank"},
                beforeSend: function () {
                },
                success: function (result) {
                    $("#div_liste_panierBasNonDate").html(result);
                }
            });
        })(jQuery);
    }
    if (jQuery("#div_liste_panierHautNonDate").length > 0) {
        (function ($) {
            $.ajax({
                type: "POST",
                url: "/resaGp/contenuPanierBoutique.php",
                data: {target: "_blank"},
                beforeSend: function () {
                },
                success: function (result) {
                    $("#div_liste_panierHautNonDate").html(result);
                }
            });
        })(jQuery);
    }
}
function ajoutPanierGestprod(no_id_tarif, borne_maxi) {
    var quantite = jQuery("#sp_qte_" + no_id_tarif).attr("valeur");
    var nouvelle_quantite = parseInt(quantite) + 1;
    if (nouvelle_quantite <= borne_maxi) {
        if (nouvelle_quantite < 10)jQuery("#sp_qte_" + no_id_tarif).html("0" + nouvelle_quantite); else jQuery("#sp_qte_" + no_id_tarif).html(nouvelle_quantite);
        jQuery("#sp_qte_" + no_id_tarif).attr("valeur", nouvelle_quantite);
        jQuery("#nbprod_" + no_id_tarif).attr("value", nouvelle_quantite);
    }
}
function retirePanierGestprod(no_id_tarif) {
    var quantite = jQuery("#sp_qte_" + no_id_tarif).attr("valeur");
    var nouvelle_quantite = parseInt(quantite) - 1;
    if (nouvelle_quantite >= 0) {
        if (nouvelle_quantite < 10)jQuery("#sp_qte_" + no_id_tarif).html("0" + nouvelle_quantite); else jQuery("#sp_qte_" + no_id_tarif).html(nouvelle_quantite);
        jQuery("#sp_qte_" + no_id_tarif).attr("valeur", nouvelle_quantite);
        jQuery("#nbprod_" + no_id_tarif).attr("value", nouvelle_quantite);
    }
}
function traiteInformationInfosBulle() {
    if (jQuery(".itea_survolInfosBulle")) {
        jQuery(".itea_survolInfosBulle").each(function (elt) {
            var id_survol = jquery(this).attr("id_survol");
            if (id_survol.length > 0) {
                jQuery('#' + id_survol).css('position', "absolute");
                jQuery('#' + id_survol).css('display', "none");
                jQuery(this).mousein(function (evt) {
                    jQuery('#' + id_survol).css('display', "block");
                });
                jQuery(this).mouseout(function (evt) {
                    jQuery('#' + id_survol).css('display', "none");
                });
            }
        });
    }
}
function traiteInformationByAncre() {
    var ancre = getAncreInQuery();
    if (ancre.substr(0, 3) == "js:") {
        var infos = ancre.split(":");
        var infosAExec = infos[1];
        eval(infosAExec);
    }
}
function boomEffectSite() {
    var objs = document.getElementsByTagName("DIV");
    for (var i = 0; i < objs.length; i++) {
        if (objs[i].childNodes && objs[i].childNodes.length < 3) {
            var x, y, duree, multiplicateur;
            if (i % 2 == 0)multiplicateur = -1; else multiplicateur = 1
            x = Math.random() * 500 * multiplicateur;
            y = Math.random() * 500 * multiplicateur;
            duree = Math.random() * 3;
            objs[i].setAttribute("x_move", x);
            objs[i].setAttribute("y_move", y);
            new Effect.Move(objs[i], {x: x, y: y, duration: duree, mode: 'relative'});
        }
    }
}
function deboomEffectSite() {
    var objs = document.getElementsByTagName("DIV");
    for (var i = 0; i < objs.length; i++) {
        if (objs[i].childNodes && objs[i].childNodes.length < 3) {
            var x, y, duree, multiplicateur;
            x = objs[i].getAttribute("x_move") * -1;
            y = objs[i].getAttribute("y_move") * -1;
            duree = Math.random() * 3;
            objs[i].setAttribute("x_move", "");
            objs[i].setAttribute("y_move", "");
            new Effect.Move(objs[i], {x: x, y: y, duration: duree, mode: 'relative'});
        }
    }
}
function getUniqueId(max) {
    var deb;
    if (!max)deb = 0; else deb = (18 - max);
    return ((new Date()).getTime() + "" + Math.floor(Math.random() * 1000000)).substr(deb, 18)
}
function afficheNbRepInDivByForm(nomFrm, nomDiv) {
    var objFrm = document.getElementById(nomFrm);
    if (!objFrm)return;
    var tabChp = getTabChmpForm(objFrm);
    for (var i = 0; i < tabChp.length; i++) {
        tabChp[i].onchange = function (evt) {
            var url = "/lib/ajax/traiteRequete.php";
            var vars = "getNbInListCurr=ok";
            for (var i = 0; i < tabChp.length; i++) {
                vars += "&" + tabChp[i].name + "=" + tabChp[i].value;
            }
            affUrlInDiv(nomDiv, url, vars);
        }
    }
    var url = "/lib/ajax/traiteRequete.php";
    var vars = "getNbInListCurr=ok";
    for (var i = 0; i < tabChp.length; i++) {
        vars += "&" + tabChp[i].name + "=" + tabChp[i].value;
    }
    affUrlInDiv(nomDiv, url, vars);
}
function encodeHTML(html) {
    var encodedHtml = escape(html);
    encodedHtml = encodedHtml.replace(/\//g, "%2F");
    encodedHtml = encodedHtml.replace(/\?/g, "%3F");
    encodedHtml = encodedHtml.replace(/=/g, "%3D");
    encodedHtml = encodedHtml.replace(/&/g, "%26");
    encodedHtml = encodedHtml.replace(/@/g, "%40");
    return encodedHtml;
}
function getInfoSession(nomvar) {
    var vars = "";
    if (!nomvar)nomvar = "SESSID";
    var sess = getQueryStringVal("PHPSESSID");
    tabSess = sess.split("#");
    sess = tabSess[0];
    if (sess)vars += "&" + nomvar + "=" + sess; else {
        vars = "";
        var info = document.cookie;
    }
    return vars;
}
function setVarEnSessionAjx(tag, val) {
    var adr = "/lib/ajax/miseEnSession.php";
    var xhr_local = creeObjHttpRequest();
    var sending = getInfoSession() + "&tag=" + tag + "&val=" + val
    xhr_local.onreadystatechange = function () {
        if (xhr_local && xhr_local.readyState == 4) {
            reponse = xhr_local.responseText;
        }
    }
    xhr_local.open("POST", adr, true);
    xhr_local.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr_local.send(sending);
}
function setClassForObj(obj, classe) {
    if (obj) {
        obj.setAttribute("class", classe);
        obj.setAttribute("className", classe);
    }
}
function setClassForObj_uniqClass(obj, classe) {
    if (obj) {
        var classAvant = obj.getAttribute("class");
        var objs = $$("." + classe);
        for (var i = 0; i < objs.length; i++)setClassForObj(objs[i], classAvant);
        setClassForObj(obj, classe);
    }
}
function getHtmlMessageFromForm(formToTransform) {
    var form = formToTransform.cloneNode(true);
    form = transformChmpFormToSpan(form);
    return form.innerHTML;
}
function envoiMailByAjaxByForm(nomIdForm, nomIdRetourMsg, transformFormulaire) {
    if (!nomIdRetourMsg) {
        nomIdRetourMsg = nomIdForm;
    }
    var adr = "/lib_2/ajax/envoiMail.php";
    var sending = "typeMail=mailContact_DPT";
    var form = document.getElementById(nomIdForm);
    if (jQuery('#' + nomIdForm).length > 0) {
        jQuery('#' + nomIdForm).find('.LV_validation_message,.LV_valid').remove()
        if (jQuery('#' + nomIdForm + ' input[name=destinataire]').length > 0) {
            sending += '&destinataire=' + jQuery('#' + nomIdForm + ' input[name=destinataire]').val();
            sending += '&email=' + jQuery('#' + nomIdForm + ' input[name=mail]').val();
        }
        if (jQuery('#' + nomIdForm + ' input[name=expediteur]').length > 0) {
            sending += '&expediteur=' + jQuery('#' + nomIdForm + ' input[name=expediteur]').val();
        }
        if (jQuery('#' + nomIdForm + ' input[name=sujet]').length > 0) {
            sending += '&sujet=' + jQuery('#' + nomIdForm + ' input[name=sujet]').val();
            sending += '&typeDemande=' + jQuery('#' + nomIdForm + ' input[name=sujet]').val();
        }
        if (jQuery('#' + nomIdForm + ' input[name=enteteMessage]').length > 0) {
            sending += '&enteteMessage=' + jQuery('#' + nomIdForm + ' input[name=enteteMessage]').val();
        }
        if (jQuery('#' + nomIdForm + ' input[name=piedMessage]').length > 0) {
            sending += '&piedMessage=' + jQuery('#' + nomIdForm + ' input[name=piedMessage]').val();
        }
        if (jQuery('#' + nomIdForm + ' input[name=msgEnvoiOK]').length > 0) {
            sending += '&msgEnvoiOK=' + jQuery('#' + nomIdForm + ' input[name=msgEnvoiOK]').val();
        }
        if (jQuery('#' + nomIdForm + ' input[name=msgEnvoiKO]').length > 0) {
            sending += '&msgEnvoiKO=' + jQuery('#' + nomIdForm + ' input[name=msgEnvoiKO]').val();
        }
        if (jQuery('#' + nomIdForm + ' input[name=gestionBR]').length > 0) {
            sending += '&gestionBR=1'
        }
        if (jQuery('#' + nomIdForm + ' input[name=telephone]').length > 0) {
            sending += '&telephone=' + jQuery('#' + nomIdForm + ' input[name=msgEnvoiKO]').val();
        }
        sending += "&urlCurr=" + document.location;
        if (transformFormulaire) {
            message = getHtmlMessageFromForm(form);
            sending += '&gestionBR=1';
        } else {
            if (form.message) {
                message = form.message.value;
            }
            if (form.messages) {
                for (var i = 0; i < form.messages.length; i++) {
                    message += form.messages[i].value;
                }
            }
        }
        sending += "&message=" + escape(message);
        var msgOK = jQuery('#' + nomIdForm + ' input[name=msgEnvoiOK]').val();
        var msgKO = jQuery('#' + nomIdForm + ' input[name=msgEnvoiKO]').val();
        jQuery('#' + nomIdRetourMsg).html("<div id='divMsgEnvoiRetour'><img src='/config_v3/imgs_defaut/roue_grise.gif' /></div>");
        var xhr_local = creeObjHttpRequest();
        xhr_local.onreadystatechange = function () {
            if (xhr_local.readyState == 4 && xhr_local.status == 200) {
                var reponse = xhr_local.responseText;
                if (reponse == 'OK') {
                    jQuery('#' + nomIdRetourMsg).addClass("messageAffiche").find('#divMsgEnvoiRetour').html(msgOK)
                } else {
                    jQuery('#' + nomIdRetourMsg).addClass("messageAffiche messageErreur").find('#divMsgEnvoiRetour').html(msgKO)
                }
                if (jQuery('#' + nomIdRetourMsg).length > 0) {
                    jQuery.scrollTo(jQuery('#' + nomIdRetourMsg), 500, {offset: -100});
                }
                jQuery('#' + nomIdForm + ' *').attr("disabled", "disabled");
            }
        }
        xhr_local.open("POST", adr, true);
        xhr_local.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr_local.send(sending);
    }
}
function envoiMailAmiByAjaxByForm(form) {
    var adr = "/lib_2/ajax/envoiMail.php";
    var typeMail = "AMI";
    var prenom_expediteur = $('prenomDeLaPart').value;
    var email_expediteur = $('emailDeLaPart').value;
    var sujet_mail = $('emailObjet').value;
    var message_mail = $('emailMessage').value;
    var ami1_mail = $('email1').value;
    var ami2_mail = $('email2').value;
    var ami3_mail = $('email3').value;
    var urlPageCurr = $('div_urlPageCourante').innerHTML;
    var motcleLien = $('div_messageAvantLien').innerHTML;
    var msgEnvoiOK = $('div_messageEnvoiOK').innerHTML;
    var msgEnvoiKO = $('div_messageEnvoiKO').innerHTML;
    if ($('div_listeReferenceSelection')) {
        var lstRefs = $('div_listeReferenceSelection').innerHTML;
    }
    if (ami1_mail.length > 0) {
        var xhr_local = creeObjHttpRequest();
        var sending = "&typeMail=" + typeMail;
        sending += "&prenomExpediteur=" + escape(prenom_expediteur);
        sending += "&expediteur=" + escape(email_expediteur);
        sending += "&sujet=" + escape(sujet_mail);
        sending += "&messageMail=" + escape(message_mail);
        sending += "&emailDest1=" + escape(ami1_mail);
        sending += "&emailDest2=" + escape(ami2_mail);
        sending += "&emailDest3=" + escape(ami3_mail);
        sending += "&urlCurr=" + escape(urlPageCurr);
        sending += "&motcleLien=" + escape(motcleLien);
        sending += "&msgEnvoiOK=" + escape(msgEnvoiOK);
        sending += "&msgEnvoiKO=" + escape(msgEnvoiKO);
        if (lstRefs) {
            sending += "&lstRefs=" + escape(lstRefs);
        }
        if (jQuery('#inputDateDebEnvoiAmi').length > 0) {
            sending += "&dateDeb=" + jQuery('#inputDateDebEnvoiAmi').val();
            sending += "&dateFin=" + jQuery('#inputDateFinEnvoiAmi').val();
        }
        if (jQuery('#select_typeCentrale').length > 0) {
            sending += "&typeCentrale=" + jQuery('#select_typeCentrale').val();
        }
        if (jQuery('#div_saisieInfosClientPourMiniCata').length > 0) {
            var tabInfosClient = getInfosClientPourMiniCata();
            sending += "&tabInfosClient=" + JSON.stringify(tabInfosClient);
        }
        xhr_local.onreadystatechange = function () {
            if (xhr_local.readyState == 4 && xhr_local.status == 200) {
                var reponse = xhr_local.responseText;
                var divReponse = $('div_messageEnvoiMail');
                divReponse.innerHTML = unescape(reponse);
                divReponse.addClassName("messageAffiche");
                if ($('div_messageEnvoiMailRetour')) {
                    $('div_messageEnvoiMailRetour').style.display = "block";
                    jQuery.scrollTo(jQuery("#div_messageEnvoiMailRetour"), 500, {offset: -100});
                }
                jQuery("#div_sendMailToFriend form *").attr("disabled", "disabled");
                jQuery("#div_envoiAmiSubmit").hide();
                jQuery(".div_messageIntroForm").hide();
            }
        }
        xhr_local.open("POST", adr, true);
        xhr_local.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr_local.send(sending);
    }
}
function getInfosClientPourMiniCata() {
    var tabInfos = {};
    (function ($) {
        tabInfos.civilite = $('#div_saisieInfosClientPourMiniCata select.civilite').val();
        tabInfos.nom = $('#div_saisieInfosClientPourMiniCata input.nom').val();
        tabInfos.prenom = $('#div_saisieInfosClientPourMiniCata input.prenom').val();
        tabInfos.adresse1 = $('#div_saisieInfosClientPourMiniCata input.adresse1').val();
        tabInfos.adresse2 = $('#div_saisieInfosClientPourMiniCata input.adresse2').val();
        tabInfos.cp = $('#div_saisieInfosClientPourMiniCata input.cp').val();
        tabInfos.ville = $('#div_saisieInfosClientPourMiniCata input.ville').val();
        tabInfos.pays = $('#div_saisieInfosClientPourMiniCata input.pays').val();
        tabInfos.teldom = $('#div_saisieInfosClientPourMiniCata input.teldom').val();
        tabInfos.telbur = $('#div_saisieInfosClientPourMiniCata input.telbur').val();
    })(jQuery);
    return tabInfos;
}
function envoiMailContactPropByAjaxByForm() {
    if (typeof(appelApresContactProp) == 'function') {
        appelApresContactProp();
    }
    var adr = "/lib_2/ajax/envoiMail.php";
    var typeMail = "CONTACTPROP";
    var nomExpediteur = jQuery('#inpt_formPropmailNom').val();
    var prenomExpediteur = jQuery('#inpt_formPropmailPrenom').val();
    var email_expediteur = jQuery('#inpt_formPropmailFrom').val();
    var telExpediteur = jQuery('#inpt_formPropmailTel').val();
    var emailDest1 = '';
    var emailDest2 = '';
    if (jQuery('#emailDest1').length > 0) {
        if (jQuery('#emailDest1Condition').length > 0) {
            if (jQuery('#emailDest1Condition').is(':checked')) {
                emailDest1 = jQuery('#emailDest1').val();
            }
        } else {
            emailDest1 = jQuery('#emailDest1').val();
        }
    }
    if (jQuery('#emailDest2').length > 0) {
        emailDest2 = jQuery('#emailDest2').val();
    }
    var sujet_mail = $('emailObjet').value;
    var date_deb;
    var nb_participant;
    var nb_participant_enfant;
    if ($('inpt_formPropmailDateDeb')) {
        date_deb = $('inpt_formPropmailDateDeb').value;
        var date_fin = $('inpt_formPropmailDateFin').value;
        nb_participant = $('select_formPropmailPers').value;
        if ($('select_formPropmailPersEnfant')) {
            nb_participant_enfant = $('select_formPropmailPersEnfant').value;
        }
    }
    else {
        date_deb = $('inpt_formPropmailDate').value;
        var duree_sej = $('inpt_formPropmailDuree').value;
        nb_participant = $('inpt_formPropmailPers').value;
        if ($('select_formPropmailPersEnfant')) {
            nb_participant_enfant = $('select_formPropmailPersEnfant').value;
        }
    }
    var message_mail = $('textarea_formPropMessage').value;
    var destinataire = jQuery('#div_infosEnvoiMail #destinataire').val();
    var infoProd = $('div_infosSuppStructure').innerHTML;
    var numheb = '';
    if ($('div_infosSuppStructure') && $('div_infosSuppStructure').getAttribute('data-numheb')) {
        numheb = $('div_infosSuppStructure').getAttribute('data-numHeb')
    }
    var msgEnvoiOK = $('div_messageEnvoiOK').innerHTML;
    var msgEnvoiKO = $('div_messageEnvoiKO').innerHTML;
    if (email_expediteur.length > 0) {
        var xhr_local = creeObjHttpRequest();
        var sending = "&typeMail=" + typeMail;
        sending += "&prenomExpediteur=" + escape(prenomExpediteur);
        sending += "&nomExpediteur=" + escape(nomExpediteur);
        sending += "&expediteur=" + escape(email_expediteur);
        sending += "&sujet=" + escape(sujet_mail);
        sending += "&dateDeb=" + escape(date_deb);
        if (date_fin) {
            sending += "&dateFin=" + escape(date_fin);
        }
        if (duree_sej)
            sending += "&dureeSej=" + escape(duree_sej);
        sending += "&telExpediteur=" + escape(telExpediteur);
        sending += "&nbParticipant=" + escape(nb_participant);
        sending += "&nbParticipantEnfant=" + escape(nb_participant_enfant);
        sending += "&destinataire=" + escape(destinataire);
        if ($('inpt_formSendItToMe').checked)sending += "&copie=" + escape(email_expediteur);
        sending += "&messageMail=" + escape(message_mail);
        sending += "&infoProd=" + escape(infoProd);
        sending += "&msgEnvoiOK=" + escape(msgEnvoiOK);
        sending += "&msgEnvoiKO=" + escape(msgEnvoiKO);
        if (emailDest1.length > 0) {
            sending += "&emailDest1=" + escape(emailDest1);
        }
        if (emailDest2.length > 0) {
            sending += "&emailDest2=" + escape(emailDest2);
        }
        if (numheb) {
            sending += "&numheb=" + escape(numheb);
        }
        if (jQuery('#inputNomStatTracking').length > 0) {
            var stat = jQuery('#inputNomStatTracking').val() || '';
            if (stat) {
                sending += "&statTracking=" + stat + '&ident=' + jQuery('#inputIdentPourStat').val();
            }
        }
        xhr_local.onreadystatechange = function () {
            if (xhr_local.readyState == 4 && xhr_local.status == 200) {
                var reponse = xhr_local.responseText;
                if (jQuery('#div_submitForm').data('trackcategory')) {
                    if (jQuery('#div_submitForm').data('datalayer')) {
                        dataLayer.push({
                            'Label_Event': jQuery('#div_submitForm').data('tracklabel'),
                            'Categorie_Event': jQuery('#div_submitForm').data('trackcategory'),
                            'event': jQuery('#div_submitForm').data('trackaction')
                        });
                    } else {
                        var _gaq = _gaq || [];
                        try {
                            _gaq.push(['wa._trackEvent', jQuery('#div_submitForm').data('trackcategory'), jQuery('#div_submitForm').data('trackaction'), jQuery('#div_submitForm').data('tracklabel')]);
                        } catch (e) {
                            console.log('erreur gaq.push :' + e)
                        }
                    }
                }
                if (jQuery('#inputParamsGTM_criteo', jQuery('#form_envoiMailProp')).length > 0 && jQuery('#inputParamsGTM_criteo', jQuery('#form_envoiMailProp')).val().length > 0) {
                    executeGTM_criteo();
                }
                var divReponse = $('div_messageEnvoiMail');
                divReponse.innerHTML = unescape(reponse);
                divReponse.addClassName("messageAffiche");
                if ($('div_messageEnvoiMailRetour')) {
                    $('div_messageEnvoiMailRetour').style.display = "block";
                    jQuery.scrollTo(jQuery("#div_messageEnvoiMailRetour"), 500, {offset: -100});
                }
                jQuery("#div_sendMailToProp form *").attr("disabled", "disabled");
                jQuery(".div_messageIntroForm").hide();
            }
        }
        xhr_local.open("POST", adr, true);
        xhr_local.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr_local.send(sending);
        var divValid = $("div_submitForm");
        if (divValid)divValid.style.display = "none";
    }
}
function envoiMailByAjax(dest, exp, cc, sujet, body, nomIdRetourMsg, msgEnvoiOK, msgEnvoiKO, sessid) {
    var adr = "/lib/ajax/envoiMail.php";
    var xhr_local = creeObjHttpRequest();
    var sending = "";
    if (dest)sending += "&destinataire=" + escape(dest);
    if (cc)sending += "&copie=" + escape(cc);
    if (exp)sending += "&expediteur=" + escape(exp);
    if (sujet)sending += "&sujet=" + escape(sujet);
    if (body)sending += "&message=" + escape(body);
    if (msgEnvoiOK)sending += "&msgEnvoiOK=" + escape(msgEnvoiOK);
    if (msgEnvoiKO)sending += "&msgEnvoiKO=" + escape(msgEnvoiKO);
    if (sessid)sending += sessid;
    var html = "<div id=divMsgEnvoiRetour><img src='/config_v3/imgs_defaut/roue_grise.gif' /></div>";
    var divMsg = document.getElementById(nomIdRetourMsg);
    if (divMsg)divMsg.innerHTML = html;
    xhr_local.onreadystatechange = function () {
        if (xhr_local.readyState == 4 && xhr_local.status == 200) {
            var reponse = xhr_local.responseText;
            var divReponse = document.getElementById("divMsgEnvoiRetour");
            divReponse.innerHTML = unescape(reponse);
        }
    }
    xhr_local.open("POST", adr, true);
    xhr_local.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr_local.send(sending);
}
function changeChoixPaysFormProp(elem) {
    if (jQuery(elem).val() == "FRANCE") {
        jQuery("#select_dpt").attr("modecheck", "checkChpObligatoire");
    }
    else {
        jQuery("#select_dpt").attr("modecheck");
    }
}
function setCookie(name, value, expires, path, domain, secure) {
    document.cookie = name + '=' + escape(value) +
    ((expires) ? '; expires=' + expires.toGMTString() : '') +
    ((path) ? '; path=' + path : '') + ((domain) ? '; domain=' + domain : '') + ((secure) ? '; secure' : '');
}
function getCookie(name) {
    if (document.cookie.length > 0) {
        var deb = document.cookie.indexOf(name + '=');
        if (deb != -1) {
            deb = deb + name.length + 1;
            var fin = document.cookie.indexOf(';', deb);
            if (fin == -1)fin = document.cookie.length;
            return unescape(document.cookie.substring(deb, fin));
        }
    }
    return '';
}
function getNbCookies(chaineAtrouver) {
    if (!chaineAtrouver) {
        chaineAtrouver = '__panier_';
    }
    var text = document.cookie;
    var regex = new RegExp(chaineAtrouver, "g");
    res = text.match(regex);
    if (res) {
        return res.length;
    } else {
        return 0;
    }
}
function getNbelementDansPanier() {
    return getNbCookies('__panier_');
}
function getExisteUnCookieDeValeur(valeur) {
    if (document.cookie.length > 0 && valeur) {
        var chaine = document.cookie.indexOf('=' + valeur);
        if (chaine != -1) {
            return true
        }
    }
    return false;
}
function getQueryString() {
    var lDoc = String(document.location);
    var n1 = lDoc.indexOf("?");
    if (n1 <= 0)return "";
    var n2 = lDoc.indexOf("#");
    if (n2 <= 0)n2 = lDoc.length;
    var qs = lDoc.substring(n1 + 1, n2);
    return qs;
}
function getAncreInQuery() {
    var lDoc = String(document.location);
    var n2 = lDoc.indexOf("#") + 1;
    var ancre = lDoc.substring(n2);
    return ancre;
}
function getQueryStringVal(lQuery) {
    var lDoc = String(document.location);
    var lSignet = "";
    var n1 = lDoc.indexOf("?");
    if (n1 > 0) {
        var n2 = lDoc.indexOf("?" + lQuery + "=", n1);
        if (n2 < n1)
            n2 = lDoc.indexOf("&" + lQuery + "=", n1);
        if (n2 >= n1) {
            n2 = n2 + ("?" + lQuery + "=").length;
            var n3 = lDoc.indexOf("&", n2 + 1);
            if (n3 > n2)
                lSignet = lDoc.substring(n2, n3); else
                lSignet = lDoc.substring(n2);
        }
    }
    return lSignet;
}
function getTabValInQueryString() {
    var loc = String(document.location);
    var n1 = loc.indexOf("?");
    var tabOut = new Array();
    if (n1 < 0)return tabOut;
    var qs = loc.substring(n1 + 1);
    var vars = qs.split("&");
    for (var i = 0; i < vars.length; i++) {
        tabOut.push(vars[i].split("="));
    }
    return tabOut;
}
function getQueryStringByForm(form) {
    var sending = "";
    if (form) {
        var elts = form.elements;
        for (var i = 0; i < elts.length; i++) {
            var elt = elts[i];
            var param = new String(elt.name).toLowerCase();
            if (param.length > 0 && elt && elt.value && elt.value.length > 0) {
                switch (elt.type) {
                    case"radio":
                    case"checkbox":
                        if (elt.checked)sending += "&" + param + "=" + escape(elt.value);
                        break;
                    default:
                    case"select":
                        sending += "&" + param + "=" + escape(elt.value);
                        break;
                }
            }
        }
    }
    return sending;
}
function getQueryStringByClassName(classe) {
    var sending = "";
    if (classe) {
        $$('.' + classe).each(function (obj) {
            if (obj.tagName == "SELECT")sending += "&" + obj.getAttribute("cgi") + "=" + obj.value; else sending += "&" + obj.getAttribute("cgi") + "=" + obj.getAttribute("valeur");
        });
    }
    return sending;
}
function desactiveForm(form) {
    var suff = form.id;
    if (!suff)suff = form.name;
    affMsgAttenteParDessusInDiv(form, suff);
    if (form) {
        var objForm = $(form);
        var elts = objForm.elements;
        for (var i = 0; i < elts.length; i++)elts[i].disabled = true;
    }
}
function reactiveForm(form) {
    var suff = form.id;
    if (!suff)suff = form.name;
    effaceMsgAttenteParDessus(suff);
    if (form) {
        var objForm = $(form);
        var elts = objForm.elements;
        for (var i = 0; i < elts.length; i++)elts[i].disabled = false;
    }
}
function scrollToAncre(nomAncre) {
    self.location.hash = "#" + nomAncre;
}
function bloqueTouche(e) {
    var DisableCtrlKeys = Array(67, 86);
    var ie = window.event;
    if (ie) {
        e = window.event;
    }
    if (e.ctrlKey) {
        for (i = 0; i < DisableCtrlKeys.length; i++) {
            if (e.keyCode == DisableCtrlKeys[i]) {
                if ((ie && e.srcElement.id == 'eMailConfirm') || (e.target && e.target.id == 'eMailConfirm')) {
                    if (ie) {
                        e.keyCode = 0;
                        e.returnValue = false;
                    }
                    return false;
                }
            }
        }
    }
}
document.onkeydown = bloqueTouche;
function getValueById(id) {
    return document.getElementById(id).value;
}
function setHTMLById(id, html) {
    if (id) {
        var obj = document.getElementById(id);
        if (obj)obj.innerHTML = html; else var stop = 1;
    }
}
function controleSaisiePaiementCptCli(form, msgPasNumeroCB, msgPasMoisCB, msgPasAnneeCB, msgPasCryptoCB, msgCarteNonValide) {
    var aujourdhui = new Date();
    if ((isNaN(form.numero_cb.value)) || (form.numero_cb.value == '')) {
        alertAMalibu(msgPasNumeroCB);
        return false;
    }
    if ((isNaN(form.mois_cb.value)) || (form.mois_cb.value < 1) || (form.mois_cb.value > 12) || ((form.mois_cb.value < (aujourdhui.getMonth() + 1)) && (form.annee_cb.value == aujourdhui.getFullYear()))) {
        alertAMalibu(msgPasMoisCB);
        return false;
    }
    if ((isNaN(form.annee_cb.value)) || (form.annee_cb.value < aujourdhui.getFullYear()) || (form.annee_cb.value > 2020)) {
        alertAMalibu(msgPasAnneeCB);
        return false;
    }
    if ((isNaN(form.crypto_cb.value)) || (form.crypto_cb.value == '') || (form.crypto_cb.value.length != 3)) {
        alertAMalibu(msgPasCryptoCB);
        return false;
    }
    verif = 0;
    numcb = form.numero_cb.value;
    for (i = 0; i < numcb.length; i = i + 2) {
        nomb = numcb.substring(i, i + 1) * 2;
        if (nomb > 9) {
            nomb = nomb - 9;
        }
        verif = verif + nomb;
    }
    for (i = 1; i < (numcb.length + 1); i = i + 2) {
        nomb = eval(numcb.substring(i, i + 1));
        verif = verif + nomb;
    }
    result = verif % 10;
    if (result != 0) {
        alertAMalibu(msgCarteNonValide);
        return false;
    }
    form.submit();
    return true;
}
function jslog(txt) {
    var nomDivLog = "div_itea_log_javascript";
    var objLog = $(nomDivLog);
    if (!objLog) {
        objLog = getNewDivToBody(nomDivLog, "logItea");
        objLog.style.position = "fixed";
        objLog.style.overflow = "auto";
        objLog.style.font = "10px arial #000000";
        objLog.style.zIndex = "100000";
        objLog.style.left = "10px";
        objLog.style.top = "10px";
        objLog.style.width = "350px";
        objLog.style.height = "180px";
        objLog.style.border = "2px #000000 solid";
        objLog.style.backgroundColor = "#FFFFFF";
        new Draggable($(objLog));
    }
    var content = objLog.innerHTML;
    content += "> " + txt + "<br>";
    objLog.innerHTML = content;
}
function setClassForCurr(obj, classname) {
    $$("." + classname).each(function (elem) {
        elem.removeClassName(classname);
    });
    $(obj).addClassName(classname);
}
function upload_addFileToList(objInptFile, ulLstFile) {
    var e = new Element('li', {'class': 'liFileAUpload'});
    var elemNomfile = new Element('span', {'class': 'spanUploadListNomFile'}).update(objInptFile.value.split("/").pop());
    var elemForSuppr = new Element('span', {'class': 'spanUploadListSuppr'}).update("<img src=/config_v3/imgs_defaut/prop/deconnecter.gif width=10 height=10>");
    e.insert(elemNomfile, {postion: 'bottom'});
    e.insert(elemForSuppr, {postion: 'bottom'});
    $(ulLstFile).insert(e, {postion: 'bottom'});
    elemForSuppr.observe("click", function (evt) {
        objInptFile.value = "";
        e.remove();
    });
    var newInpt = $(objInptFile).cloneNode(true);
    newInpt.name = "inptUploadFile_" + getUniqueId();
    newInpt.style.display = "none";
    setClassForCurr(newInpt, "inptUploadFile");
    if (navigator.userAgent.indexOf('Firefox') > -1)objInptFile.value = "";
    $("divLst_inptsUpload").insert(newInpt);
}
function uploadGo(objForm) {
    $(objForm).submit();
    $$('li.liFileAUpload').each(function (obj) {
        obj.remove();
    });
    $$('input.inptUploadFile').each(function (obj) {
        obj.remove();
    });
}
function uploadChoixFile(objForm) {
    var objinptId = $(objForm).select('.inptFileUpload').last().id;
    document.getElementById(objinptId).select();
}
function ajoutMessageIE6(div) {
    if (div) {
        div.style.display = 'none';
        var html = '';
        html += '<div id="avertissementTitre">CONSEIL VISITEUR&nbsp;</div>\n';
        html += '<div id="div_croix_avertissement"><a href="#" ><IMG class=img_navigateur src="/config_v3/imgs_defaut/ie6/close.png"></a></div>\n';
        html += '<div id="avertissementText">vous utilisez une version obselète d’Internet Explorer. Au delà des risques de sécurité que votre ordinateur encourt, nous vous informons que notre site Internet n’est plus optimisé pour cette version. Nous vous invitons à mettre à jour au plus vite votre navigateur ou à utiliser ceux préconisées :</div>\n';
        html += '<div id="logoNavigateur"><a href="http://www.google.fr/chrome" target=_blank><IMG class=img_navigateur src="/config_v3/imgs_defaut/ie6/chrome.jpg"></a>&nbsp;<a href="http://www.mozilla-europe.org/fr/firefox/" target=_blank><IMG class=img_navigateur src="/config_v3/imgs_defaut/ie6/ff.jpg"></a>&nbsp;<a href="http://www.microsoft.com/france/windows/ie" target=_blank><IMG class=img_navigateur src="/config_v3/imgs_defaut/ie6/ie.jpg"></a></div>\n';
        document.getElementById(div.getAttribute('id')).innerHTML = html;
    }
}
function verifNavigateur(moduleProp) {
    if ($('div_avertissementIE8')) {
        if (getVersionIE() < 9) {
            ajoutMessageIE6($('div_avertissementIE8'));
            if (getVersionIE() == 7) {
                document.getElementById('div_avertissementIE8').style.display = 'block';
            } else {
                new Effect.BlindDown('div_avertissementIE8', 1);
            }
        }
    } else if ($('div_avertissementIE6')) {
        if (getVersionIE() < 7) {
            ajoutMessageIE6($('div_avertissementIE6'));
            new Effect.BlindDown('div_avertissementIE6', 1);
        }
    }
}
function masquerAvertissement() {
    new Effect.BlindUp('div_avertissementIE6', 1);
}
function ouvrirFermerDiv(nomDiv) {
    if ($(nomDiv).showing == true) {
        Effect.BlindUp(nomDiv);
        $(nomDiv).showing = false;
    }
    else {
        Effect.BlindDown(nomDiv);
        $(nomDiv).showing = true;
    }
}
function afficheBulleAvecDiv(evt, txt, largMax, suffixe) {
    var bulle = document.getElementById("divInfoBulleAvecDiv");
    if (!bulle)bulle = getNewDivToBody("divInfoBulleAvecDiv", "divInfoBulleAvecDiv");
    bulle.style.position = "absolute";
    bulle.style.color = "#000000";
    bulle.style.zIndex = "10000001";
    var txt2;
    txt2 = "<div class='div_bulle_haut' id='div_bulle_haut_" + suffixe + "'></div>";
    txt2 += "<div class='div_bulle_gauche' id='div_bulle_gauche_" + suffixe + "'></div>";
    txt2 += "<div class='div_bulle_content' id='div_bulle_content_" + suffixe + "'>";
    txt2 += txt;
    txt2 += "</div>";
    txt2 += "<div class='div_bulle_droite' id='div_bulle_droite_" + suffixe + "'></div>";
    txt2 += "<div class='div_bulle_bas' id='div_bulle_bas_" + suffixe + "'></div>";
    bulle.innerHTML = unescape(txt2);
    bulle.style.visibility = "visible";
    setPositionObjBySouris(evt, bulle, 15, 25);
}
function effaceBulleAvecDiv(evt) {
    var bulle = document.getElementById("divInfoBulleAvecDiv");
    if (bulle)bulle.style.visibility = "hidden";
}
function getParamSite(nomParam) {
    switch (nomParam) {
        case"mode_recherche_carte":
            if ($('divParametre_ModeRechercheCarte')) {
                return $('divParametre_ModeRechercheCarte').innerHTML;
            }
            break;
        case"mode_ouverture_resa":
            if ($('divParametre_ModeAffichageResa')) {
                return $('divParametre_ModeAffichageResa').innerHTML;
            }
            break;
    }
}
function sendThisContentToFriend() {
    var cmd = "envoi2ami";
    var w = 620;
    var h = 500;
    var titreDiv = "Envoyer à un ami";
    var objet = "MSG_FORMAIL_OBJET_MAIL_ENVOI_AMI_CONTENT";
    var url = document.location.href;
    var lien = "MSG_MESSAGE_ENVOI_LIEN_CONTENT";
    var message = "MSG_CORP_MAIL_ENVOIAMI_CONTENT";
    sendThisToFriend(cmd, w, h, titreDiv, objet, url, lien, message, "");
}
function sendThisToFriend(cmd, w, h, titreDiv, objet, url, lien, message, lstRef) {
    if (getVersionIE() < 7)return false;
    if (!w || !h) {
        if (getVersionIE() < 9) {
            w = parseInt(document.documentElement.clientWidth) * 0.9;
            h = parseInt(document.documentElement.clientHeight) * 0.9;
        } else {
            w = parseInt(window.innerWidth) * 0.9;
            h = parseInt(window.innerHeight) * 0.9;
        }
        if (!w)w = 800;
        if (!h)h = 600;
    }
    var adr = "/lib_2/ajax/contenuFenetre.php";
    var xhr_local = creeObjHttpRequest();
    var html_init = "<div id='div_sendMailToFriend'><img src=/config_v3/imgs_defaut/loading/roue16x16.gif /><br /></div>";
    afficheDivAvecTransparence(html_init, w, h, null, titreDiv);
    var sending = getInfoSession() + "&element=" + cmd + "&motClesObjetMail=" + escape(objet) + "&URL=" + url + "&motClesLien=" + escape(lien) + "&motClesMessage=" + escape(message) + "&lstReference=" + lstRef;
    xhr_local.onreadystatechange = function () {
        if (xhr_local && xhr_local.readyState == 4) {
            html = xhr_local.responseText;
            if ($('div_sendMailToFriend'))$('div_sendMailToFriend').innerHTML = html;
            if (jQuery('#inputDateFinEnvoiAmi').length > 0) {
                jQuery('#inputDateDebEnvoiAmi').datepicker({
                    minDate: 0, onSelect: function (date) {
                        jQuery('#inputDateFinEnvoiAmi').datepicker({minDate: date});
                    }
                });
            }
            if (jQuery('#select_typeCentrale').length > 0) {
                jQuery('#select_typeCentrale').change(function () {
                    var mail = jQuery(this).find('option:selected').attr('data-mail');
                    jQuery('#emailDeLaPart').val(mail);
                });
            }
            if (jQuery('#div_envoiAmisInfosMiniCata').length > 0) {
                jQuery('#div_envoiAmisInfosMiniCata').click(function () {
                    if (jQuery('#div_saisieInfosClientPourMiniCata').is(':visible')) {
                        jQuery('#div_saisieInfosClientPourMiniCata').hide();
                    } else {
                        jQuery('#div_saisieInfosClientPourMiniCata').show();
                    }
                });
            }
        }
    }
    xhr_local.open("POST", adr, true);
    xhr_local.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr_local.send(sending);
}
function sendThisToProp(ident, w, h, titreDiv, mailALaCentrale, forceQueMailCentrale, dateDeb, dureeSejour) {
    if (!mailALaCentrale) {
        mailALaCentrale = "N"
    }
    if (!forceQueMailCentrale) {
        forceQueMailCentrale = "N";
    }
    if (getVersionIE() < 7) {
        return false;
    }
    if (!w || !h) {
        if (getVersionIE() < 9) {
            w = parseInt(document.documentElement.clientWidth) * 0.9;
            h = parseInt(document.documentElement.clientHeight) * 0.9;
        } else {
            w = parseInt(window.innerWidth) * 0.9;
            h = parseInt(window.innerHeight) * 0.9;
        }
        if (!w)w = 800;
        if (!h)h = 600;
    }
    var adr = "/lib_2/ajax/contenuFenetre.php";
    var sending = "&element=xhtmlEnvoiProp&ident=" + ident + "&mailALaCentrale=" + mailALaCentrale + "&forceQueMailCentrale=" + forceQueMailCentrale;
    var html_init = "<div id='div_sendMailToProp'><img src=/config_v3/imgs_defaut/loading/roue16x16.gif /><br /></div>";
    afficheDivAvecTransparence(html_init, w, h, null, titreDiv);
    var xhr_local = creeObjHttpRequest();
    xhr_local.onreadystatechange = function () {
        if (xhr_local && xhr_local.readyState == 4) {
            html = xhr_local.responseText;
            if ($('div_sendMailToProp'))$('div_sendMailToProp').innerHTML = html;
            initFormContactProp(dateDeb, ident, dureeSejour);
        }
    }
    xhr_local.open("POST", adr, true);
    xhr_local.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr_local.send(sending);
}
function initFormContactProp(dateDeb, ident, dureeSejour) {
    (function ($) {
        var langue = initLangueForDatePicker();
        $.datepicker.setDefaults($.datepicker.regional[langue]);
        if ($(".datepicker").length > 0) {
            if (dateDeb) {
                var objDateDeb = new OBJDate(dateDeb);
                $("#div_sendMailToProp .datepicker:first").val(dateDeb);
                if ($("#inpt_formPropmailDateFin")) {
                    if (dureeSejour) {
                        var dateFin = new OBJDate(dateDeb);
                        dateFin.ajoutJour(dureeSejour);
                        $("#inpt_formPropmailDateFin").val(dateFin.toString());
                        delete dateFin;
                    }
                }
            }
            $(".datepicker").datepicker({minDate: 0, dateFormat: 'dd/mm/yy', firstDay: 1});
        }
        $("#inpt_formPropmailDateDeb").datepicker("option", "onSelect", function (selectedDate) {
            var dateDebut = new OBJDate(selectedDate);
            dateDebut.ajoutJour(1);
            $("#inpt_formPropmailDateFin").datepicker("option", "minDate", dateDebut.toString());
            $('#inpt_formPropmailDateFin').datepicker("setDate", dateDebut.toString());
            delete dateDebut;
            setTimeout(function () {
                $('#inpt_formPropmailDateFin').focus();
            }, 0);
        });
        $("#inpt_formPropmailDateFin").datepicker("option", "onSelect", function (selectedDate) {
            var dateFin = new OBJDate(selectedDate);
            var dateDebut = new OBJDate($("#inpt_formPropmailDateDeb").val());
            verifDureMiniSejour(ident, dateDebut.toString(), dateFin.getNbJourEcartWithOBJDate(dateDebut));
            delete dateFin;
            delete dateDebut;
        });
        if (objDateDeb) {
            if (dureeSejour) {
                verifDureMiniSejour(ident, dateDeb, dureeSejour)
            }
            if ($("#inpt_formPropmailDateFin")) {
                objDateDeb.ajoutJour(1);
                $("#inpt_formPropmailDateFin").datepicker("option", "minDate", objDateDeb.toString());
            }
        }
        $("#sp_btnReload").click(function () {
            var date = new Date();
            var time = date.getTime();
            var srcCaptcha = $("#span_captchaImg img").attr("src");
            var pos = srcCaptcha.indexOf("?time");
            if (pos != -1) {
                srcCaptcha = srcCaptcha.substr(0, pos);
            }
            srcCaptcha += "?time=" + time;
            $("#span_captchaImg img").attr("src", srcCaptcha);
        });
    })(jQuery);
}
function verifDureMiniSejour(ident, dateDebutString, dureeSejour) {
    (function ($) {
        $('#div_dateFin .commentaire_restrictions').html('')
        jQuery.ajax({
            type: "POST",
            url: "/lib_2/ajax/contenuFenetre.php",
            data: {
                dateDebut: dateDebutString,
                element: 'elemObjProd',
                typeInfo: 'getDureeMiniMaxiByDate-' + ident + '-' + dateDebutString
            },
            success: function (retour) {
                eval("var tabRetour=" + retour);
                if (tabRetour.mini > dureeSejour) {
                    $('#div_dateFin').append('<span class="commentaire_restrictions">' + $('#div_dateFin').attr('data-avant') + ' ' + tabRetour.mini + ' ' + $('#div_dateFin').attr('data-apres') + '</span>');
                    $('#div_dateFin .commentaire_restrictions').dialog({
                        modal: true,
                        zIndex: 1000005,
                        minWidth: 400,
                        title: $('#div_dateFin').attr('data-titre'),
                        buttons: [{
                            text: 'ok', click: function () {
                                $(this).dialog('close');
                            }
                        }]
                    });
                }
            }
        });
    })(jQuery);
}
function verifEtEnvoiMailAmi() {
    var i = 0;
    (function ($) {
        var langue = $("body").attr("data-langue");
        var mailClient = new LiveValidation("emailDeLaPart", {validMessage: "Ok", onlyOnSubmit: true});
        addValidateOnLiveValidationEmail(mailClient, langue, true);
        var mailAmi1 = new LiveValidation("email1", {validMessage: "Ok", onlyOnSubmit: true});
        addValidateOnLiveValidationEmail(mailAmi1, langue, true);
        var mailAmi2 = new LiveValidation("email2", {validMessage: "Ok", onlyOnSubmit: true});
        addValidateOnLiveValidationEmail(mailAmi2, langue, false);
        var mailAmi3 = new LiveValidation("email3", {validMessage: "Ok", onlyOnSubmit: true});
        addValidateOnLiveValidationEmail(mailAmi3, langue, false);
        if (langue == "FRANCAIS") {
            if (!$('#prenomDeLaPart').hasClass('optionnel')) {
                var prenomClient = new LiveValidation("prenomDeLaPart", {validMessage: "Ok", onlyOnSubmit: true});
                prenomClient.add(Validate.Presence, {failureMessage: "Champ obligatoire"});
            }
            var message = new LiveValidation("emailMessage", {validMessage: "Ok", onlyOnSubmit: true});
            message.add(Validate.Presence, {failureMessage: "Champ obligatoire"});
        } else {
            if (!$('#prenomDeLaPart').hasClass('optionnel')) {
                var prenomClient = new LiveValidation("prenomDeLaPart", {validMessage: "Ok", onlyOnSubmit: true});
                prenomClient.add(Validate.Presence, {failureMessage: "Required field"});
            }
            var message = new LiveValidation("emailMessage", {validMessage: "Ok", onlyOnSubmit: true});
            message.add(Validate.Presence, {failureMessage: "Required field"});
        }
        var tabAValider = new Array(mailClient, mailAmi1, mailAmi2, mailAmi3, message);
        if (!$('#prenomDeLaPart').hasClass('optionnel')) {
            tabAValider.push(prenomClient);
        }
        LiveValidation.massValidate(tabAValider);
        if ($(".LV_invalid").length == 0) {
            envoiMailAmiByAjaxByForm();
        }
    })(jQuery);
}
function reinitValueDefautInput() {
    jQuery("input[data-defaut]").each(function () {
        if (jQuery(this).hasClass("chpInptErreurDetecte")) {
            jQuery(this).val(jQuery(this).attr("data-defaut"));
        }
    });
}
function verifEtEnvoiMailContactProp(tracking) {
    var track = tracking || false;
    if (track) {
        window.trackingContactProp = true;
    }
    if ($('form_envoiMailProp')) {
        var form = $('form_envoiMailProp');
        checkForm(form, envoiMailContactPropByAjaxByForm, erreurEnvoiMailContactProp);
    }
}
function erreurEnvoiMailContactProp() {
    jQuery.scrollTo("#form_envoiMailProp", 500, {offset: -20});
}
function ouvreCalDeb() {
    (function ($) {
        $("#inpt_formPropmailDateDeb").datepicker({minDate: 0});
    })(jQuery);
}
function verifEtEnvoiMailContactProp_2() {
    (function ($) {
        $("#form_envoiMailProp select").focus(function () {
            $(this).siblings(".LV_validation_message").remove();
        });
        $("#form_envoiMailProp #captcha").focus(function () {
            $("#div_captcha span").remove(".LV_validation_message");
        });
        var langue = $("body").attr("data-langue");
        var email = new LiveValidation("inpt_formPropmailFrom", {validMessage: "Ok", onlyOnSubmit: true});
        addValidateOnLiveValidationEmail(email, langue, true);
        if (langue == "FRANCAIS") {
            var tel = new LiveValidation("inpt_formPropmailTel", {validMessage: "Ok", onlyOnSubmit: true});
            tel.add(Validate.Format, {pattern: /^[0-9]{6,}$/, failureMessage: "6 chiffres minimum"});
            var dateDeb = new LiveValidation("inpt_formPropmailDateDeb", {validMessage: "Ok", onlyOnSubmit: true});
            dateDeb.add(Validate.Presence, {failureMessage: "Champ obligatoire"});
            dateDeb.add(Validate.Format, {
                pattern: /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/,
                failureMessage: "Veuillez saisir une date au format jj/mm/aaaa"
            });
            var dateFin = new LiveValidation("inpt_formPropmailDateFin", {validMessage: "Ok", onlyOnSubmit: true});
            dateFin.add(Validate.Presence, {failureMessage: "Champ obligatoire"});
            dateFin.add(Validate.Format, {
                pattern: /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/,
                failureMessage: "Veuillez saisir une date au format jj/mm/aaaa"
            });
            var msg = new LiveValidation("textarea_formPropMessage", {validMessage: "Ok", onlyOnSubmit: true});
            msg.add(Validate.Presence, {failureMessage: "Champ obligatoire"});
            var codeSecu = new LiveValidation("captcha", {validMessage: "Ok", onlyOnSubmit: true});
            codeSecu.add(Validate.Presence, {failureMessage: "Champ obligatoire"});
        } else {
            var tel = new LiveValidation("inpt_formPropmailTel", {validMessage: "Ok", onlyOnSubmit: true});
            tel.add(Validate.Format, {pattern: /^[0-9]{6,}$/, failureMessage: "6 numbers minimum"});
            var dateDeb = new LiveValidation("inpt_formPropmailDateDeb", {validMessage: "Ok", onlyOnSubmit: true});
            dateDeb.add(Validate.Presence, {failureMessage: "Required field"});
            dateDeb.add(Validate.Format, {
                pattern: /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/,
                failureMessage: "Please enter a date in the format dd/mm/yyyy"
            });
            var dateFin = new LiveValidation("inpt_formPropmailDateFin", {validMessage: "Ok", onlyOnSubmit: true});
            dateFin.add(Validate.Presence, {failureMessage: "Required field"});
            dateFin.add(Validate.Format, {
                pattern: /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/,
                failureMessage: "Please enter a date in the format dd/mm/yyyy"
            });
            var msg = new LiveValidation("textarea_formPropMessage", {validMessage: "Ok", onlyOnSubmit: true});
            msg.add(Validate.Presence, {failureMessage: "Required field"});
            var codeSecu = new LiveValidation("captcha", {validMessage: "Ok", onlyOnSubmit: true});
            codeSecu.add(Validate.Presence, {failureMessage: "Required field"});
        }
        var tabAValider = new Array(email, tel, dateDeb, dateFin, msg, codeSecu);
        LiveValidation.massValidate(tabAValider);
        var xhtml = "";
        $("#div_pays span").remove(".LV_validation_message");
        if ($("#select_pays").val() != "0")
            xhtml = "<span class='LV_validation_message LV_valid'>Ok</span>"; else {
            if (langue == "FRANCAIS")xhtml = "<span class='LV_validation_message LV_invalid'>Champ obligatoire</span>"; else xhtml = "<span class='LV_validation_message LV_invalid'>Required field</span>";
        }
        $("#div_pays").append(xhtml);
        xhtml = "";
        if ($("#select_dpt:visible").length > 0) {
            $("#div_dpt span").remove(".LV_validation_message");
            if ($("#select_dpt").val() != "0")
                xhtml = "<span class='LV_validation_message LV_valid'>Ok</span>"; else {
                if (langue == "FRANCAIS")xhtml = "<span class='LV_validation_message LV_invalid'>Champ obligatoire</span>"; else xhtml = "<span class='LV_validation_message LV_invalid'>Required field</span>";
            }
            $("#div_dpt").append(xhtml);
            xhtml = "";
        }
        $("#div_nbPers span").remove(".LV_validation_message");
        if (($("#select_formPropmailPers").attr('data-obligatoire') === '0') || ($("#select_formPropmailPers").val() != "0" && $("#select_formPropmailPers").val() != "")) {
            xhtml = "<span class='LV_validation_message LV_valid'>Ok</span>";
        } else {
            if (langue == "FRANCAIS") {
                xhtml = "<span class='LV_validation_message LV_invalid'>Champ obligatoire</span>";
            } else {
                xhtml = "<span class='LV_validation_message LV_invalid'>Required field</span>";
            }
        }
        $("#div_nbPers").append(xhtml);
        xhtml = "";
        var value = $("#captcha").val();
        $.ajax({
            type: "POST",
            url: "/lib_2/ajax/infosDist.php",
            async: false,
            data: {info: "checkCodeSecu", val: value},
            success: function (retour) {
                eval("var tabRetour=" + retour);
                $("#div_captcha span").remove(".LV_validation_message");
                if (tabRetour.code == "Ok") {
                    xhtml = "<span class='LV_validation_message LV_valid'>Ok</span>";
                }
                else {
                    if (langue == "FRANCAIS")xhtml = "<span class='LV_validation_message LV_invalid'>Code incorrect</span>"; else xhtml = "<span class='LV_validation_message LV_invalid'>Incorrect code</span>";
                }
                $("#div_captcha").append(xhtml);
            }
        });
        if ($(".LV_invalid").length == 0) {
            envoiMailContactPropByAjaxByForm();
            if ($('#apresEnvoiMail_GAEVENT')) {
                $('#apresEnvoiMail_GAEVENT').click();
            }
        } else {
            if (typeof(dataLayer) != 'undefined') {
                dataLayer.push({'form_error': true, 'event': 'form_error'});
                var champsInvalides = '';
                $('.LV_invalid_field').each(function () {
                    champsInvalides += $(this).attr('name') + ', ';
                });
                champsInvalides = champsInvalides.substring(0, champsInvalides.length - 2);
                dataLayer.push({'form_error_field': champsInvalides, 'event': 'form_error'});
            }
        }
    })(jQuery);
}
function verifPaysEtAfficheDpt(pays) {
    (function ($) {
        if (pays.value == "FRANCE") {
            $("#div_dpt").show();
            $("#select_dpt").attr("modecheck", "checkChpObligatoire");
        }
        else {
            $("#div_dpt").hide();
            $("#select_dpt").attr("modecheck", "");
        }
        if (pays.value != "") {
            pays.removeClassName("chpInptErreurDetecte")
        }
    })(jQuery);
}
function verifChoixDepartementFormProp(elem) {
    if (jQuery(elem).val() != "") {
        jQuery(elem).removeClass("chpInptErreurDetecte").addClass("chpInptAucuneErreur");
    }
    else {
        jQuery(elem).removeClass("chpInptAucuneErreur").addClass("chpInptErreurDetecte");
    }
}
function estSurPanier() {
    return jQuery("#divParametre_TypePage").html();
}
function initFiche() {
    initAlbumPhotoJquery();
    initLinkPlanFancyBox();
    initLinkVideoFancyBox();
    initLinkLanceAlbumPhotoFancyBox();
    initAfficheDetailPieceFancyBox();
    initLinkLanceAlbumPhotoListeFancyBox();
    initCalendrierAvecTarifs();
    initChoixTypeTarifMini();
    initTarifs_gereAffichageColonne();
    init_sliderMobile();
    init_flagsTraductions();
    init_selectDatePourResa();
    init_avisClients();
    init_afficheMsqueDispoUneChambre();
    init_afficheNumeroTelProprio();
    init_affichePlusPromotions();
}
function init_affichePlusPromotions() {
    (function ($) {
        $(".a_promoEnSavoirPlus").click(function () {
            var promo = "#" + $(this).attr("data-rel");
            var lblPlus = $(this).attr("data-lblPlus");
            var lblMoins = $(this).attr("data-lblMoins");
            if ($(promo).hasClass("closed")) {
                $(promo).addClass("opened").removeClass("closed");
                $(this).html(lblMoins);
            }
            else {
                $(promo).addClass("closed").removeClass("opened");
                $(this).html(lblPlus);
            }
        });
    })(jQuery);
}
function init_afficheNumeroTelProprio() {
    jQuery(".sp_telPropByClick").click(function () {
        jQuery(this).find(".sp_telPropByClick_lbl").hide();
        jQuery(this).find(".sp_telPropByClick_numero").show();
    });
}
function init_selectDatePourResa() {
    if (jQuery('#select_dateSejour.select_ficheDatesDisposV5').length > 0) {
        jQuery('#select_dateSejour.select_ficheDatesDisposV5').change(function () {
            jQuery(this).parent().children('input[name="jour"]').attr('value', jQuery(this).children('option:selected').data('jour'));
            jQuery(this).parent().children('input[name="mois"]').attr('value', jQuery(this).children('option:selected').data('mois'));
            jQuery(this).parent().children('input[name="annee"]').attr('value', jQuery(this).children('option:selected').data('annee'));
            jQuery(this).parent().children('input[name="nbj"]').attr('value', jQuery(this).children('option:selected').data('nbj'));
        })
    }
}
function initListe() {
    initLinkLanceAlbumPhotoListeFancyBox();
    initChoixTarifsNDate();
}
function initPageStorage(tabJson) {
    (function ($) {
        if (tabJson) {
            var value;
            var body = $('body')[0];
            for (var key in tabJson) {
                value = tabJson[key];
                $.data(body, key, value)
            }
        }
    })(jQuery);
}
function init_avisClients() {
    (function ($) {
        if ($(".boutonMoreAvisClients").length > 0) {
            $(".boutonMoreAvisClients").click(function () {
                var divParent = '#' + $(this).attr("data-div-rel");
                if ($(this).hasClass("afficheAvis")) {
                    $(divParent).find(".avisMasque").fadeIn();
                    $(this).text($(this).attr("data-lblAfficheMoins"));
                    $(this).removeClass("afficheAvis");
                    if (foncQdFini_afficheAvisClient) {
                        foncQdFini_afficheAvisClient();
                    }
                }
                else {
                    $(divParent).find(".avisMasque").hide();
                    $(this).addClass("afficheAvis");
                    $(this).text($(this).attr("data-lblAffichePlus"));
                    if (foncQdFini_masqueAvisClient) {
                        foncQdFini_masqueAvisClient();
                    }
                }
            });
        }
        $(".ul_avisRecapNotes li.filtrable").each(function () {
            $(this).click(function () {
                var note = $(this).attr("data-note");
                $('.div_avisClientDetail').hide();
                $('.div_avisClientDetail[data-note="' + note + '"]').fadeIn();
                $(".div_afficheAvisSuppl").hide();
                $(".div_avisPhraseRecapNb").show();
                $(".p_phraseRecapNote").hide();
                $('.p_phraseRecapNote[data-note="' + note + '"]').show();
            })
        });
        $(".a_avisClientsVoirTous").click(function () {
            $('.div_avisClientDetail').fadeIn();
            $(".div_avisPhraseRecapNb").hide();
        });
    })(jQuery);
}
function initLinkPlanFancyBox() {
    (function ($) {
        if ($(".a_linkPlanFancyBox").length > 0) {
            $(".a_linkPlanFancyBox").fancybox({
                maxWidth: 800,
                maxHeight: 600,
                fitToView: true,
                width: '70%',
                height: '70%',
                autoSize: true,
                closeClick: false,
                openEffect: 'none',
                closeEffect: 'none'
            });
        }
    })(jQuery);
}
function initAfficheDetailPieceFancyBox() {
    (function ($) {
        if ($(".a_linkDetailPieceFancyBox").length > 0) {
            $(".a_linkDetailPieceFancyBox").fancybox({
                maxWidth: 800,
                maxHeight: 600,
                fitToView: true,
                width: '70%',
                height: '70%',
                autoSize: true,
                closeClick: false,
                openEffect: 'none',
                closeEffect: 'none'
            });
        }
    })(jQuery);
}
function initLinkVideoFancyBox() {
    (function ($) {
        if ($(".a_linkYoutubeFancyBox").length > 0) {
            $(".a_linkYoutubeFancyBox").fancybox({
                maxWidth: 800,
                maxHeight: 600,
                fitToView: true,
                width: '70%',
                height: '70%',
                autoSize: true,
                closeClick: false,
                openEffect: 'none',
                closeEffect: 'none'
            });
        }
    })(jQuery);
    (function ($) {
        if ($(".a_linkDailymotionFancyBox").length > 0) {
            $(".a_linkDailymotionFancyBox").fancybox({
                maxWidth: 800,
                maxHeight: 600,
                fitToView: true,
                width: '70%',
                height: '70%',
                autoSize: true,
                closeClick: false,
                openEffect: 'none',
                closeEffect: 'none'
            });
        }
    })(jQuery);
}
function initLinkLanceAlbumPhotoFancyBox() {
    if (jQuery("#a_fiche_lien_album").length > 0) {
        var tabImgs = new Array();
        tabImgs[0] = jQuery("#img_fiche_photoPrincipale").attr("src");
        jQuery("#a_fiche_lien_album").bind("click", function () {
            jQuery(".img_album").each(function (i) {
                tabImgs[i + 1] = jQuery(this).attr("src");
            });
            jQuery.fancybox(tabImgs);
        });
    }
}
function initLinkLanceAlbumPhotoListeFancyBox() {
    if (jQuery(".a_lst_lien_disporama").length > 0) {
        jQuery(".a_lst_lien_disporama").bind("click", function () {
            var lstImages = jQuery(this).attr("data-tabPhotos");
            var lstLegendes = jQuery(this).attr("data-tabLegendes");
            tabImgs = lstImages.split(";");
            tabLegendes = lstLegendes.split(";");
            tabTout = new Array();
            for (var i = 0; i < tabImgs.length; i++) {
                var obj = {href: tabImgs[i], title: tabLegendes[i]}
                tabTout.push(obj)
            }
            var autoPlay = false;
            if (jQuery(this).attr('data-autoplay') == '1') {
                autoPlay = true;
            }
            jQuery.fancybox(tabTout, {prevEffect: 'fade', nextEffect: 'fade', autoPlay: autoPlay});
        });
    }
}
function completeVilleAvecCP2(ville, cp, pays) {
    (function ($) {
        if ($("#" + pays).val() == "FRANCE") {
            if ($("#div_listeVillesByCP").length > 0)
                $("#div_listeVillesByCP").hide();
            $.ajax({
                type: "POST",
                url: "/lib_2/ajax/infosDist.php",
                data: {info: "getVilleByCP", cp: $("#" + cp).val(), limit: 46},
                beforeSend: function () {
                },
                success: function (result) {
                    if (result === '') {
                        return false;
                    }
                    eval("var tabResult = " + result);
                    if (tabResult.length == 1)
                        $("#" + ville).val(tabResult[0].commune); else if (tabResult.length > 1) {
                        var html = "";
                        html += "<ul class='ul_listeVilles'>";
                        for (var i = 0; i < tabResult.length; i++) {
                            html += "<li class='li_listeVilles'>";
                            html += tabResult[i].commune;
                            html += "</li>";
                        }
                        html += "</ul>";
                        if ($("#div_listeVillesByCP").length > 0) {
                            $("#div_listeVillesByCP").html(html);
                            $("#div_listeVillesByCP").show();
                        }
                        else {
                            html = "<div id='div_listeVillesByCP'>" + html + "</div>";
                            $("#" + ville).parent().append(html);
                        }
                        $(".li_listeVilles").each(function () {
                            $(this).click(function () {
                                $("#" + ville).val($(this).text());
                                $("#" + ville).blur();
                                $("#div_listeVillesByCP").hide();
                            });
                        });
                    }
                }
            });
        }
    })(jQuery);
}
function initChoixTypeTarifMini() {
    if (jQuery(".select_choixTypeSejourPourPrix").length > 0) {
        jQuery(".select_choixTypeSejourPourPrix").change(function () {
            jQuery(this).parents(".div_prixParTypeSejourContent").find(".sp_tarifMinTypeSejour").hide();
            jQuery(this).parents(".div_prixParTypeSejourContent").find(".sp_tarifMinTypeSejour[data-type=" + jQuery(this).val() + "]").show();
            if (jQuery(this).parents(".div_prixParTypeSejourContent").find(".sp_apresTarifMinTypeSejour").length > 0) {
                jQuery(this).parents(".div_prixParTypeSejourContent").find(".sp_apresTarifMinTypeSejour").hide();
                jQuery(this).parents(".div_prixParTypeSejourContent").find(".sp_apresTarifMinTypeSejour[data-type=" + jQuery(this).val() + "]").show();
            }
        });
    }
}
function initCalendrierAvecTarifs() {
    (function ($) {
        if ($('.calendIteaTarifsSemaine_listMois').length > 0) {
            $('.calendIteaTarifsSemaine_listMois').each(function () {
                var nombreDeSlidesADecaler = 3;
                if ($(this).attr('data-nombreDeSlidesADecaler'))nombreDeSlidesADecaler = $(this).attr('data-nombreDeSlidesADecaler');
                var sudoSliderTarifsSemaines = $(this).sudoSlider({
                    prevNext: true,
                    speed: 0,
                    moveCount: nombreDeSlidesADecaler,
                    nextHtml: '<a class="nextBtn">&gt;</a>',
                    prevHtml: '<a class="prevBtn">&lt;</a>'
                });
            });
        }
    })(jQuery);
}
function initCalendrierDisposGP() {
    (function ($) {
        initSliderCalendrier();
        if ($('.div_disposProd').length > 0) {
            $('.div_disposProd table.tableDisposProdOneMonth').each(function () {
                $('.spanCalendJourGP_libreArriveePossible, .spanDateSejourDevisArriveePossible', this).click(function () {
                    var lien = $(this).attr('data-lienResa');
                    if (lien.length > 0) {
                        window.open(lien, "blank");
                    }
                });
            });
        }
    })(jQuery);
}
function initSliderCalendrier() {
    (function ($) {
        if ($('.div_disposProd').length > 0) {
            $('.div_disposProd').each(function () {
                var nombreDeSlidesADecaler = 1;
                if ($(this).attr('data-nombreDeSlidesADecaler'))nombreDeSlidesADecaler = $(this).attr('data-nombreDeSlidesADecaler');
                var sudoSlider = $(this).sudoSlider({
                    customLink: $('.btnDispoProdMoisSuivPrec'),
                    prevNext: false,
                    speed: 0,
                    moveCount: nombreDeSlidesADecaler
                });
            });
        }
    })(jQuery);
}
function initSliderCalendrierParSemaine() {
    (function ($) {
        if ($('.calendIteaTarifsSemaine_listMois').length > 0) {
            $('.calendIteaTarifsSemaine_listMois').each(function () {
                var nombreDeSlidesADecaler = 3;
                if ($(this).attr('data-nombreDeSlidesADecaler'))nombreDeSlidesADecaler = $(this).attr('data-nombreDeSlidesADecaler');
                var sudoSlider = $(this).sudoSlider({
                    prevNext: false,
                    speed: 0,
                    moveCount: nombreDeSlidesADecaler,
                    nextHtml: '<a class="nextBtn">></span>',
                    prevHtml: '<a class="prevBtn"><</span>'
                });
            });
        }
    })(jQuery);
}
function initCalendrierAnnuelGP() {
    (function ($) {
        initCalendrierDisposGP();
        $.fn.qtip.zindex = 1000001;
        $('.div_disposProdAnnee table.tableDisposProdOneMonth').each(function () {
            $('.spanCalendJourGP_libreArriveePossible, .spanDateSejourDevisArriveePossible, .spanCalendJourGP_libre', this).qtip({
                content: {text: false},
                style: {classes: 'jgrowl ui-tooltip-blue ui-tooltip-rounded', zindex: 9999999}
            });
        });
    })(jQuery);
}
function initWidgetResaGP() {
    (function ($) {
        initSliderCalendrier();
        if ($('.div_disposProd').length > 0) {
            $('.div_disposProd table.tableDisposProdOneMonth').each(function () {
                $('.spanCalendJourGP_libreArriveePossible, .spanDateSejourDevisArriveePossible', this).click(function () {
                    if ($(this).hasClass('DatePassee')) {
                    }
                    else {
                        var lien = $('#input_DomainResaDefaut').attr('value') + $(this).attr('data-lienResa');
                        if ($('#itea_widget_resa_annee').length > 0) {
                            var tabInfos = lien.split('&');
                            var length = tabInfos.length;
                            for (var i = 0; i < length; i++) {
                                switch (tabInfos[i].substring(0, 4)) {
                                    case'jour':
                                        var cleVal = tabInfos[i].split('=');
                                        var jour = parseInt(cleVal[1], 10);
                                        $('#itea_widget_resa_jour > option').removeAttr("selected");
                                        $('#itea_widget_resa_jour > option[value="' + jour + '"]').attr("selected", "selected");
                                        break;
                                    case'mois':
                                        var cleVal = tabInfos[i].split('=');
                                        var mois = parseInt(cleVal[1], 10);
                                        $('#itea_widget_resa_mois > option').removeAttr("selected");
                                        $('#itea_widget_resa_mois > option[value="' + mois + '"]').attr("selected", "selected");
                                        break;
                                    case'anne':
                                        var cleVal = tabInfos[i].split('=');
                                        var annee = cleVal[1];
                                        $('#itea_widget_resa_annee > option').removeAttr("selected");
                                        $('#itea_widget_resa_annee > option[value="' + annee + '"]').attr("selected", "selected");
                                        break;
                                }
                            }
                        }
                        $('table.tableDisposProdOneMonth .spanCalendJourarriveeSelected').removeClass('spanCalendJourarriveeSelected');
                        $(this).addClass('spanCalendJourarriveeSelected');
                        if (lien.length > 0) {
                            if ($('#a_itea_widget_resa_valid').length > 0) {
                                var ope = "";
                                if ($("#input_OPE").length > 0) {
                                    ope = $("#input_OPE").val();
                                    if (ope.length > 0) {
                                        lien += "&ope=" + ope;
                                    }
                                }
                                lien += '&widget=1';
                                if ($('#itea_widget_resa_duree').length > 0)lien += '&duree=' + $('#itea_widget_resa_duree option[selected="selected"]').val();
                                $('#a_itea_widget_resa_valid').attr('href', lien);
                            }
                        }
                    }
                });
                $('.spanCalendJourGP_libreArriveePossible.right, .spanDateSejourDevisArriveePossible.right, .spanCalendJourGP_libre.right', this).qtip({
                    content: {text: false},
                    style: {classes: 'jgrowl ui-tooltip-blue ui-tooltip-rounded'},
                    position: {my: 'top right'}
                });
                $('.spanCalendJourGP_libreArriveePossible.left, .spanDateSejourDevisArriveePossible.left, .spanCalendJourGP_libre.left', this).qtip({
                    content: {text: false},
                    style: {classes: 'jgrowl ui-tooltip-blue ui-tooltip-rounded'},
                    position: {my: 'top left'}
                });
            });
        }
        if ($('#itea_widget_resa_annee').length > 0) {
            $('#itea_widget_resa_annee > option, #itea_widget_resa_jour > option, #itea_widget_resa_mois > option').click(function () {
                switch ($(this).parent().attr('id')) {
                    case'itea_widget_resa_annee':
                        $('#itea_widget_resa_annee > option').removeAttr('selected');
                        break;
                    case'itea_widget_resa_jour':
                        $('#itea_widget_resa_jour > option').removeAttr('selected');
                        break;
                    case'itea_widget_resa_mois':
                        $('#itea_widget_resa_mois > option').removeAttr('selected');
                        break;
                }
                $(this).attr('selected', 'selected');
                var link = $('#input_DomainResaDefaut').attr('value') + $('#input_linkResaDefaut').val();
                if ($('#itea_widget_resa_jour option[selected="selected"]').val())link += '&jour=' + $('#itea_widget_resa_jour option[selected="selected"]').val();
                if ($('#itea_widget_resa_mois option[selected="selected"]').val())link += '&mois=' + $('#itea_widget_resa_mois option[selected="selected"]').val();
                if ($('#itea_widget_resa_annee option[selected="selected"]').val())link += '&annee=' + $('#itea_widget_resa_annee option[selected="selected"]').val();
                if ($('#itea_widget_resa_duree').length > 0)link += '&duree=' + $('#itea_widget_resa_duree option[selected="selected"]').val();
                var ope = "";
                if ($("#input_OPE").length > 0) {
                    ope = $("#input_OPE").val();
                    if (ope.length > 0) {
                        link += "&ope=" + ope;
                    }
                }
                link += '&widget=1';
                $('#a_itea_widget_resa_valid').attr('href', link);
            });
            $('#itea_widget_resa_img_calend').click(function () {
                if ($('.calendItea_navigEtCalend').css('display') == 'none') {
                    $('.calendItea_navigEtCalend').show('fast');
                }
                else {
                    $('.calendItea_navigEtCalend').hide('fast');
                }
            });
        }
        if ($('#itea_widget_resa_duree').length > 0) {
            $('#itea_widget_resa_duree > option').click(function () {
                $('#itea_widget_resa_duree > option').removeAttr('selected');
                $(this).attr('selected', 'selected');
                var link = $('#input_DomainResaDefaut').attr('value') + $('#input_linkResaDefaut').val();
                if ($('#itea_widget_resa_jour option[selected="selected"]').val())link += '&jour=' + $('#itea_widget_resa_jour option[selected="selected"]').val();
                if ($('#itea_widget_resa_mois option[selected="selected"]').val())link += '&mois=' + $('#itea_widget_resa_mois option[selected="selected"]').val();
                if ($('#itea_widget_resa_annee option[selected="selected"]').val())link += '&annee=' + $('#itea_widget_resa_annee option[selected="selected"]').val();
                if ($('#itea_widget_resa_duree').length > 0)link += '&duree=' + $('#itea_widget_resa_duree option[selected="selected"]').val();
                var ope = "";
                if ($("#input_OPE").length > 0) {
                    ope = $("#input_OPE").val();
                    if (ope.length > 0) {
                        link += "&ope=" + ope;
                    }
                }
                link += '&widget=1';
                $('#a_itea_widget_resa_valid').attr('href', link);
            });
        }
        if ($('#select_dateSejour').length > 0) {
            var lienpardefaut = $('#input_DomainResaDefaut').attr('value') + $('#input_linkResaDefaut').attr('value') + '&DISPOS=' + $('#select_dateSejour').attr('value');
            $('#a_itea_widget_resa_valid').attr('href', lienpardefaut);
            $('#select_dateSejour').change(function () {
                var value = $(this).attr('value');
                var href = $('#input_DomainResaDefaut').attr('value') + $('#input_linkResaDefaut').attr('value') + '&DISPOS=' + value;
                var ope = "";
                if ($("#input_OPE").length > 0) {
                    ope = $("#input_OPE").val();
                    if (ope.length > 0) {
                        href += "&ope=" + ope;
                    }
                }
                $('#a_itea_widget_resa_valid').attr('href', href);
            });
        }
    })(jQuery);
}
function checkAllMotsCle() {
    (function ($) {
        $("#checkboxValideAll").click(function () {
            var checked = $(this).attr('checked');
            if (checked == 'checked') {
                $('.inputMotCleAModifier').attr('checked', true);
            }
            else {
                $('.inputMotCleAModifier').attr('checked', false);
            }
        });
    })(jQuery);
}
function lancementStat() {
    (function ($) {
        $("[class*='iteaStatMe_']").click(setStatToElement);
    })(jQuery);
}
function setStatToElement(elem) {
    (function ($) {
        elem = elem.currentTarget;
        var classes = $(elem).attr('class');
        var tabClass = classes.split(' ');
        var typeStat = '';
        for (var i = 0; i < tabClass.length; i++) {
            if (tabClass[i].substring(0, 11) == 'iteaStatMe_') {
                typeStat = tabClass[i].substring(11);
            }
        }
        var ident = $(elem).attr('data-ident');
        if (ident != undefined && ident.length > 0 && typeStat.length > 0) {
            trackMe(ident, typeStat, '1');
        }
    })(jQuery);
}
function getNumSemaine(aaaa, mm, jj) {
    var MaDate = new Date(aaaa, mm, jj);
    var annee = MaDate.getFullYear();
    var NumSemaine = 0;
    ListeMois = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    if (annee % 4 == 0 && annee % 100 != 0 || annee % 400 == 0) {
        ListeMois[1] = 29;
    }
    var TotalJour = 0;
    for (cpt = 0; cpt < (mm - 1); cpt++) {
        TotalJour += ListeMois[cpt];
    }
    TotalJour += jj;
    DebutAn = new Date(annee, 0, 1);
    var JourDebutAn;
    JourDebutAn = DebutAn.getDay();
    if (JourDebutAn == 0) {
        JourDebutAn = 7;
    }
    TotalJour -= 8 - JourDebutAn;
    NumSemaine = 1;
    NumSemaine += Math.floor(TotalJour / 7);
    if (TotalJour % 7 != 0) {
        NumSemaine += 1;
    }
    return (NumSemaine);
}
function XMLToArray(xmlDoc, numericalKeyName) {
    var nameNumeric = numericalKeyName || 'item';
    var thisArray = new Array();
    if (jQuery(xmlDoc).children().length > 0) {
        jQuery(xmlDoc).children().each(function () {
            var nameOfTheNode = this.nodeName;
            if (this.nodeName == nameNumeric) {
                nameOfTheNode = jQuery(this).attr('tag');
            }
            if (jQuery(this).children().length > 0) {
                var NextNode = jQuery(this);
                thisArray[nameOfTheNode] = XMLToArray(NextNode, nameNumeric);
            } else {
                thisArray[nameOfTheNode] = jQuery(this).text();
            }
        });
    }
    if (thisArray['ROOT'] != undefined) {
        return thisArray['ROOT'];
    }
    return thisArray;
}
function initAfficheMasqueTexteEntetePage() {
    (function ($) {
        if ($('.introLimit').length > 0) {
            var compteurTexteMax = $('.introLimit').attr('data-limitTexte');
            var texteEtude = '';
            $.each($('.introLimit div,.introLimit p,.introLimit li,.introLimit h3'), function () {
                if (compteurTexteMax < 0) {
                    $(this).addClass('hidePlus')
                } else if ($(this).children('div').length == 0 && $(this).children('li').length == 0 && $(this).children('p').length == 0) {
                    texteEtude = $.trim($(this).text())
                    compteurTexteMax -= texteEtude.length
                    if (compteurTexteMax < 0) {
                        var size = texteEtude.length + compteurTexteMax;
                        var texteFinal = texteEtude.substr(0, size);
                        var texteFinalCache = texteEtude.substr(size);
                        var htmlTextCourt = texteFinal + '<span class="hideMoins">...'
                        if ($('.introLimit').attr('data-lblPlus').length > 0) {
                            htmlTextCourt += '<a href="javascript:void(0);" class="a_enteteTexteAfficheSuite a_enteteTexteAfficheSuiteTheme" data-show="1" >' + $('.introLimit').attr('data-lblPlus') + '</a>';
                        }
                        htmlTextCourt += '</span>'
                        htmlTextCourt += '<span class="hidePlus">' + texteFinalCache + '</span>';
                        $(this).html(htmlTextCourt)
                        $(this).find('.hidePlus').hide();
                    }
                }
            })
            if ($('.introLimit').find('.hidePlus')) {
                if ($('.introLimit').attr('data-lblMoins').length > 0) {
                    $('.introLimit').append('<a href="javascript:void(0);" class="a_enteteTexteAfficheSuite a_enteteTexteAfficheSuiteTheme hidePlus" data-show="0" >' + $('.introLimit').attr('data-lblMoins') + '</a>');
                    $('.introLimit .hidePlus').hide();
                }
                $('.introLimit .a_enteteTexteAfficheSuite').click(function () {
                    if ($(this).attr('data-show') == '1') {
                        $('.introLimit .hidePlus').show();
                        $('.introLimit .hideMoins').hide();
                    } else {
                        $('.introLimit .hidePlus').hide();
                        $('.introLimit .hideMoins').show();
                    }
                })
            }
        } else {
            if ($(".span_enteteTexteAfficheMasque").length > 0) {
                $(".span_enteteTexteAfficheMasque").hide();
            }
            if ($(".a_enteteTexteAfficheSuite").length > 0) {
                $(".a_enteteTexteAfficheSuite").toggle(function () {
                    $(".span_enteteTexteAfficheMasque").show();
                    $(".span_enteteTexteAfficheSuite").hide();
                    $(this).text($(this).attr("data-lblMoins"));
                    $(this).parent().addClass('open');
                }, function () {
                    $(".span_enteteTexteAfficheMasque").hide();
                    $(".span_enteteTexteAfficheSuite").show();
                    $(this).text($(this).attr("data-lblPlus"));
                    $(this).parent().removeClass('open');
                })
            }
        }
    })(jQuery);
}
function initTarifs_gereAffichageColonne() {
    if (jQuery(".select_changeColonneTarif").length > 0) {
        jQuery(".select_changeColonneTarif").change(function () {
            jQuery(this).parent().parent().find("#div_tableTarif table").find(".colonneTarif").hide();
            jQuery(this).parent().parent().find("#div_tableTarif table").find(".colonneTarif_" + jQuery(this).val()).show();
        });
    }
}
function init_flagsTraductions() {
    (function ($) {
        $('li.li_drapeaux a').click(function () {
            var langue = $(this).attr('data-langue');
            if (langue != 'FRANCAIS') {
                $('p.description_environnement, p.description_gite').hide();
                $('p.description_environnement' + langue + ', p.description_gite' + langue).show('fast');
            }
            else {
                $('p.description_environnement, p.description_gite').hide();
                $('p#p_fiche_description_environnement, p#p_fiche_description_gite').show('fast');
            }
            return false;
        });
    })(jQuery)
}
function initLangueDatepicker() {
    var langue = window.lang || false;
    if (!langue) {
        langue = jQuery('html').attr('lang');
    }
    jQuery.datepicker.setDefaults(jQuery.datepicker.regional[langue]);
}
function autocompleteurCpVille(inputCp, inputVille, domaine) {
    var nomDomaine = domaine || '';
    (function ($) {
        $(inputCp).autocomplete({
            source: function (request, response) {
                var params = {
                    url: nomDomaine + '/lib_2/ajax/infosDist.php',
                    dataType: "json",
                    type: 'POST',
                    data: {cp: request.term, info: 'getVilleByCP', allfields: '1', like: 1, limit: 46},
                    success: function (data) {
                        response($.map(data, function (item) {
                            return {
                                label: item.code_postal + ", " + item.commune,
                                value: item.commune,
                                code: item.code_postal
                            };
                        }));
                    }
                };
                if (nomDomaine) {
                    params.dataType = 'jsonp';
                }
                $.ajax(params);
            }, minLength: 2, select: function (event, ui) {
                event.preventDefault();
                var val = ui.item.value;
                $(inputVille).val(val);
                $(inputCp).val(ui.item.code);
            }, open: function () {
                $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
            }, close: function () {
                $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
            }
        });
    })(jQuery)
}
function autocompleteurParametrable(elemInput, inputHidden, url, action, minLength, callback) {
    var minLengthParam = minLength || 2;
    (function ($) {
        $(elemInput).autocomplete({
            source: function (request, response) {
                var params = {
                    value: request.term,
                    typeinfo: action,
                    info: action,
                    action: action,
                    returnJson: true,
                    pourAutocompleteur: true
                };
                params[$(elemInput).attr('name')] = request.term;
                $.ajax({
                    url: url, dataType: "json", data: params, success: function (data) {
                        response($.map(data, function (item) {
                            return {label: item.label, value: item.value};
                        }));
                    }
                });
            }, minLength: minLengthParam, select: function (event, ui) {
                var fonction = callback || false;
                event.preventDefault();
                if (fonction) {
                    try {
                        window[fonction](ui.item);
                    }
                    catch (e) {
                    }
                }
                else {
                    var val = ui.item.value;
                    $(inputHidden).val(val);
                    $(elemInput).val(ui.item.label);
                }
            }, open: function () {
                $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
            }, close: function () {
                $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
            }
        });
    })(jQuery)
}
function clickOnWidgetCartoSites(elem, e, data) {
    var objData = data || false;
    if (objData) {
        if (objData.site.substring(0, 4) != 'http' && objData.site.substring(0, 4) != 'HTTP') {
            objData.site = 'http://' + objData.site;
        }
        window.open(objData.site);
    }
}
function hoverOnWidgetCarto(elem, e, data) {
    var objData = data || false;
    if (objData) {
        if (navigator.appName != "Microsoft Internet Explorer") {
            xMouse = e.pageX + 1;
            yMouse = e.pageY + 1;
        } else {
            var de = document.documentElement;
            var b = document.body;
            xMouse = window.event.clientX + (de.scrollLeft || b.scrollLeft) - (de.clientLeft || 0);
            yMouse = window.event.clientY + (de.scrollTop || b.scrollTop) - (de.clientTop || 0);
        }
        jQuery('#infobulleDpt').remove();
        var infoBulle = jQuery("<div id='infobulleDpt' class='infobulleCarto' data-dpt='" + elem.data("value") + "'></div>").append('<span>' + objData.libelle + '</span>');
        jQuery(infoBulle).appendTo('body');
        var left = xMouse;
        infoBulle.css('position', 'absolute');
        infoBulle.css("left", left + 20);
        infoBulle.css('zIndex', 12000);
        infoBulle.css("top", yMouse - 5);
        infoBulle.css("display", "block");
    }
}
function outOnWidgetCarto(elem, e, data) {
    if (elem.data("value") == jQuery('#infobulleDpt').attr('data-dpt')) {
        jQuery('#infobulleDpt').remove();
    }
}
function moveOnWidgetCarto(elem, e, data) {
    if (navigator.appName != "Microsoft Internet Explorer") {
        xMouse = e.pageX + 1;
        yMouse = e.pageY + 1;
    } else {
        var de = document.documentElement;
        var b = document.body;
        xMouse = window.event.clientX + (de.scrollLeft || b.scrollLeft) - (de.clientLeft || 0);
        yMouse = window.event.clientY + (de.scrollTop || b.scrollTop) - (de.clientTop || 0);
    }
    jQuery('#infobulleDpt').css("left", xMouse + 20);
    jQuery('#infobulleDpt').css("top", yMouse - 5);
}
function initWidgetPointDeVente() {
    (function ($) {
        $('.btn_connexionPV').unbind('click');
        $('.btn_connexionPV').bind('click', function (event) {
            event.preventDefault();
            var vars = $(this).parents('form').serialize();
            $.ajax({
                url: '/lib_2/ajax/infosDist.php',
                type: 'POST',
                dataType: 'xml',
                data: 'info=connectionPV&' + vars,
                success: function (data) {
                    var tabResult = XMLToArray(data);
                    if (tabResult.code == 'OK') {
                        document.location.href = tabResult.url_accueil;
                    } else {
                        $(".div_msgErreurConnexionPv").show();
                    }
                }
            });
        });
        $('.btnDeconnexionPV').click(function () {
            var div = $(this).parents('.itea_connexionPV');
            var typePv = $(this).parents('.itea_connexionPV').attr('data-type');
            $.ajax({
                url: '/lib_2/ajax/infosDist.php',
                type: 'POST',
                dataType: 'xml',
                data: 'info=deconnectionPV&typePV=' + typePv,
                success: function (data) {
                    var tabResult = XMLToArray(data);
                    if (tabResult.code == 'OK') {
                        document.location.href = "/";
                    }
                }
            });
        });
        $(".form_connexionPV input[type='text']").focus(function () {
            $(".div_msgErreurConnexionPv").hide();
        });
    })(jQuery)
}
function debugLogJS(nomFonction) {
    (function ($) {
        $.ajax({
            url: '/lib_2/ajax/infosDist.php',
            type: 'POST',
            data: {'info': 'debugLogJS', 'nomFonction': nomFonction}
        });
    })(jQuery);
}
function initChangementMotDePassePV() {
    (function ($) {
        $('.btnChangeMDPPV').click(function () {
            $.ajax({
                url: '/lib_2/ajax/contenuFenetre.php',
                type: 'POST',
                dataType: 'xml',
                data: 'element=pv&typeInfo=displayChangePass',
                success: function (data) {
                    var xml = XMLToArray(data);
                    var html = xml.html;
                    var titre = xml.titre;
                    var textAnnuler = xml.annuler;
                    $('<div id="popinPV">').dialog({
                        height: 300, width: 730, buttons: [{
                            text: "Ok", click: function () {
                                $('#popinPV form').submit();
                            }
                        }, {
                            text: textAnnuler, click: function () {
                                $(this).dialog('close');
                                $('#popinPV').remove();
                            }
                        }], title: titre
                    }).html(html);
                    var fonctionValid = function () {
                        var vars = $('#formChangementPassPV').serialize();
                        jQuery('#popinPV .erreurChangementMDPPV').remove();
                        $('#qtipPV').remove();
                        $.ajax({
                            url: '/lib_2/ajax/contenuFenetre.php',
                            type: 'POST',
                            dataType: 'xml',
                            data: 'element=pv&typeInfo=changePass&' + vars,
                            success: function (data) {
                                var xml = XMLToArray(data);
                                if (xml.code == 'OK') {
                                    $('#popinPV').dialog('destroy');
                                    $('#popinPV').remove();
                                    jQuery('#changePassCE').qtip({
                                        content: {text: xml.message},
                                        style: {classes: 'jgrowl ui-tooltip-blue ui-tooltip-rounded'},
                                        position: {my: 'top right'},
                                        show: {
                                            event: false, ready: true, effect: function () {
                                                $(this).stop(0, 1).fadeIn(400);
                                            }, delay: 0
                                        },
                                        hide: {
                                            effect: function () {
                                                $(this).slideUp();
                                            }
                                        }
                                    });
                                    setTimeout(function () {
                                        jQuery('#changePassCE').qtip('hide');
                                    }, 3000);
                                }
                                else {
                                    jQuery('#popinPV').append('<p class="erreurChangementMDPPV" style="display:none;"><span class="ui-icon ui-icon-alert"></span>&nbsp;<span>' + xml.message + '</span></p>');
                                    $('.erreurChangementMDPPV').slideDown('fast');
                                }
                            }
                        });
                    };
                    initValidationFormulaires(fonctionValid, function () {
                    });
                }
            });
        });
    })(jQuery);
}
function loadScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'http://maps.googleapis.com/maps/api/js?key=AIzaSyDwyvX1RaJOlfzTQuh0QJdCqofz7C9CXjw&sensor=FALSE&callback=initialize';
    document.body.appendChild(script);
}
function initialize() {
    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(-34.397, 150.644),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(document.getElementById('div_mediasCarte'), mapOptions);
}
function includeJS(scriptName) {
    var script = document.createElement('script');
    script.src = scriptName;
    script.type = 'text/javascript';
    document.body.appendChild(script);
}
function initChoixTarifsNDate() {
    (function ($) {
        if ($('.div_choixTarifAjax').length > 0) {
            $('.div_choixTarifAjax').each(function () {
                var ident = $(this).attr('data-ident');
                var avecListeDeroulante = $(this).find('.inpt_choixTarifAvecListe').val();
                var avecAccesResa = $(this).find('.inpt_choixTarifAccesResa').val();
                var divChoixTarif = $(this);
                var reload = $(this).find('.inpt_choixTarifReload').val();
                $.ajax({
                    type: 'POST',
                    url: '/lib_2/ajax/infosDist.php',
                    data: {
                        info: "getHTML_choixTarifNDate",
                        ident: ident,
                        avecListeDeroulante: avecListeDeroulante,
                        avecAccesResa: avecAccesResa,
                        reload: reload
                    },
                    success: function (result) {
                        divChoixTarif.replaceWith(result);
                    }
                });
            });
        }
    })(jQuery);
}
function init_afficheMsqueDispoUneChambre() {
    (function ($) {
        if ($('.a_afficheMasqueDispoUneChambre').length > 0) {
            $('.a_afficheMasqueDispoUneChambre').click(function () {
                var idChambre = $(this).attr("data-chambre");
                var divDispo = $('.div_dispoUneCHambre[data-chambre="' + idChambre + '"]');
                var lblAffiche = $(this).attr('data-lbl-affiche');
                var lblMasque = $(this).attr('data-lbl-masque');
                if ($(divDispo).is(":hidden")) {
                    $(divDispo).show();
                    $(this).text(lblMasque);
                }
                else {
                    $(divDispo).hide();
                    $(this).text(lblAffiche);
                }
            })
        }
    })(jQuery);
}
function initAllCalendrierItea() {
    $$("div.calendrierITEANbMois").each(function (objCal) {
        objCal.hide();
        var btPrec = objCal.select("span.calendrierITEA_navig_previous").first();
        var btSuiv = objCal.select("span.calendrierITEA_navig_next").first();
        var nbMois = objCal.getAttribute("nbMois");
        var div1mois = objCal.select("div.calendrierITEA1Mois").first();
        var objUl = objCal.select("ul.calendrierITEA_list").first();
        if (objUl) {
            objUl.style.position = "absolute";
            objUl.style.width = "50000px";
            objCal.style.overflow = "hidden";
            setScrollHorizontalOnDiv(objCal, objUl, {"nextButton": btSuiv, "prevButton": btPrec, "nbLiDecal": nbMois});
        }
        objCal.show();
    });
}
function setScrollHorizontalOnDiv(idDiv, idUl, params) {
    if (!$(params.nextButton) || !$(params.prevButton)) {
        return false;
    }
    var btSuiv = $(params.nextButton);
    var btPrec = $(params.prevButton);
    var decal;
    if (!params.noResizeToLi) {
        if ($(idDiv) && $(idUl) && $(idUl).firstChild) {
            $(idDiv).style.width = $(idUl).firstChild.offsetWidth + 'px';
            $(idUl).style.padding = '0px';
        }
    }
    btPrec.style.visibility = "hidden";
    if (btSuiv) {
        btSuiv.onclick = function (evt) {
            if (params.decalage) {
                decal = params.decalage;
            } else if (params.nbLiDecal) {
                var unLi = idUl.childNodes[1].offsetLeft;
                decal = unLi * params.nbLiDecal;
            } else {
                decal = $(idDiv).getWidth();
            }
            var posXLastChild = $(idUl).childElements().last().positionedOffset(idUl).left;
            var posX0 = $(idUl).positionedOffset(idDiv).left;
            var posX1 = posXLastChild + $(idUl).childElements().last().getWidth() + posX0;
            var posFinal = posXLastChild + $(idUl).childElements().last().getWidth();
            if (posX1 - decal < decal) {
                decal = posX1 - decal;
            }
            if (btPrec) {
                btPrec.style.visibility = "visible";
            }
            if (params.scrollSansEffet) {
                var position = $(idUl).positionedOffset(idDiv).left;
                $(idUl).style.left = (position + (decal * -1)) + "px";
                if (decal == 0) {
                    btSuiv.style.visibility = "hidden";
                }
                if ($(params.ulJumelle)) {
                    $(params.ulJumelle).style.left = $(params.ulJumelle).positionedOffset(idDiv).left + (decal * -1);
                }
            } else {
                new Effect.Move(idUl, {x: decal * -1, mode: 'relative'})
                if ($(params.ulJumelle)) {
                    new Effect.Move(params.ulJumelle, {x: decal * -1, mode: 'relative'})
                }
            }
        }
    }
    if (btPrec) {
        btPrec.onclick = function (evt) {
            if (params.decalage) {
                decal = params.decalage;
            } else if (params.objDecalage) {
                decal = params.objDecalage.getWidth();
                if (params.multipDecal) {
                    decal *= params.multipDecal;
                }
            } else {
                decal = $(idDiv).getWidth();
            }
            var posX = $(idUl).positionedOffset(idDiv).left;
            if (posX + decal > 0) {
                decal = posX * -1;
            }
            if (btSuiv) {
                btSuiv.style.visibility = "visible";
            }
            if (params.scrollSansEffet) {
                var position = $(idUl).positionedOffset(idDiv).left;
                $(idUl).style.left = (position + decal) + "px";
                if ((position + decal) == 0) {
                    btPrec.style.visibility = "hidden";
                }
                if ($(params.ulJumelle)) {
                    $(params.ulJumelle).style.left = $(params.ulJumelle).positionedOffset(idDiv).left + decal;
                }
            } else {
                new Effect.Move(idUl, {x: decal, mode: 'relative'})
                if ($(params.ulJumelle)) {
                    new Effect.Move(params.ulJumelle, {x: decal, mode: 'relative'})
                }
            }
        }
    }
    return true;
}
function setScrollVerticalOnDiv(idDiv, idUl, params) {
    var btSuiv = $(params.nextButton);
    var btPrec = $(params.prevButton);
    var decal;
    if (!params.noResizeToLi) {
        if ($(idDiv) && $(idUl) && $(idUl).firstChild) {
            var tailleMax = normaliseTaille(idDiv, idUl + " li", "fieldset", {
                "height": true,
                "width": true,
                "conteneur": "li"
            });
            if (getVersionIE() < 9) {
                var hauteurMax = parseInt(tailleMax['h']) + 10;
                var largeurMax = parseInt(tailleMax['w']) + 20;
            } else {
                var largeurMax = parseInt(tailleMax['w']) + 15;
                var hauteurMax = parseInt(tailleMax['h']) + 10;
            }
            if (!params.nbLi) {
                $(idDiv).style.width = largeurMax * 2 + 'px';
                $(idDiv).style.height = hauteurMax * 3 + 'px';
                $(idUl).style.width = (largeurMax - 5) * 2 + 'px';
            } else {
                if (parseInt(params.nbLi) <= 2) {
                    $(idDiv).style.height = hauteurMax + 'px';
                    if (parseInt(params.nbLi) <= 1) {
                        $(idDiv).style.width = largeurMax + 'px';
                        $(idUl).style.width = largeurMax - 5 + 'px';
                    }
                    else {
                        $(idDiv).style.width = largeurMax * 2 + 'px';
                        $(idUl).style.width = (largeurMax - 5) * 2 + 'px';
                    }
                } else if (parseInt(params.nbLi) > 2 && (parseInt(params.nbLi) < 7)) {
                    $(idDiv).style.height = hauteurMax * (Math.ceil(params.nbLi / 2)) + 'px';
                    $(idDiv).style.width = largeurMax * 2 + 'px'
                    $(idUl).style.width = (largeurMax - 5) * 2 + 'px';
                } else {
                    $(idDiv).style.width = largeurMax * 2 + 'px'
                    $(idDiv).style.height = hauteurMax * 3 + 'px';
                    $(idUl).style.width = (largeurMax - 5) * 2 + 'px'
                }
            }
            $(idUl).style.padding = '0px';
        }
    }
    if (btSuiv) {
        btSuiv.onclick = function (evt) {
            if (params.decalage)decal = params.decalage; else if (params.nbLiDecal) {
                var unLi = $(idUl).childNodes[1].offsetHeight;
                decal = unLi * params.nbLiDecal;
            } else if (params.listeBulle) {
                if ($(idUl).positionedOffset(idDiv).top > 0) {
                    if (getVersionIE() < 9)decal = hauteurMax + 25; else decal = hauteurMax + 20;
                }
                else {
                    decal = hauteurMax + 2;
                }
            } else decal = $(idDiv).getHeight();
            var posYLastChild = $(idUl).childElements().last().positionedOffset(idUl).top;
            var posY0 = $(idUl).positionedOffset(idDiv).top;
            var posY1 = posYLastChild + $(idUl).childElements().last().getHeight() + posY0;
            if (posY1 - decal < decal) {
                decal = posY1 - decal;
            }
            if (params.scrollSansEffet) {
                $(idUl).style.top = ($(idUl).positionedOffset(idDiv).top + (decal * -1)) + "px";
                if ($(params.ulJumelle))$(params.ulJumelle).style.top = $(params.ulJumelle).positionedOffset(idDiv).top + (decal * -1);
            } else {
                new Effect.Move(idUl, {y: decal * -1, mode: 'relative'})
                if ($(params.ulJumelle))new Effect.Move(params.ulJumelle, {y: decal * -1, mode: 'relative'})
            }
        }
    }
    if (btPrec) {
        btPrec.onclick = function (evt) {
            if (params.decalage)decal = params.decalage; else if (params.objDecalage) {
                decal = params.objDecalage.getHeight();
                if (params.multipDecal)decal *= params.multipDecal;
            } else if (params.listeBulle) {
                if ($(idUl).positionedOffset(idDiv).top > 0) {
                    if (getVersionIE() < 9)decal = hauteurMax + 20; else decal = hauteurMax + 20;
                }
                else decal = hauteurMax + 2;
            }
            else decal = $(idDiv).getHeight();
            var posY = $(idUl).positionedOffset(idDiv).top;
            if (posY + decal > 0) {
                decal = posY * -1;
            }
            if (params.scrollSansEffet) {
                $(idUl).style.top = ($(idUl).positionedOffset(idDiv).top + decal) + "px";
                if ($(params.ulJumelle))$(params.ulJumelle).style.top = $(params.ulJumelle).positionedOffset(idDiv).top + decal;
            } else {
                new Effect.Move(idUl, {y: decal, mode: 'relative'})
                if ($(params.ulJumelle))new Effect.Move(params.ulJumelle, {y: decal, mode: 'relative'})
            }
        }
    }
    return true;
}
function setScrollHorizontalOnLstGenerePage(idDiv, idUl, params) {
    if (!$(idDiv) || !$(idUl) || !$(params.idDivPastePage))return false;
    var eltUl = new Element("ul", {'class': 'ulScrollPage'});
    var numPage = 1;
    $(idUl).childElements().each(function (eltPage) {
        var eltLi = new Element("li", {'class': 'liScrollPage'})
        if (numPage == 1)eltLi.addClassName("liScrollPage_select");
        eltLi.numPage = numPage;
        eltLi.update(numPage++);
        eltLi.observe("click", function (evt) {
            $$("li.liScrollPage_select").each(function (obj) {
                obj.removeClassName("liScrollPage_select");
            });
            this.addClassName("liScrollPage_select");
            var liAAfficher = $(idUl).childElements().toArray()[(this.numPage - 1)];
            var decalLi = liAAfficher.positionedOffset(idDiv).left;
            var decalCurr = $(idUl).positionedOffset(idDiv).left;
            var decal = (decalLi + decalCurr) * -1;
            new Effect.Move(idUl, {x: decal, mode: 'relative'})
        });
        eltUl.appendChild(eltLi);
    });
    switch (params.position) {
        case"bottom":
        default:
            $(params.idDivPastePage).appendChild(eltUl);
            break;
        case"top":
            $(params.idDivPastePage).insertBefore(eltUl, $(params.idDivPastePage).childElements().first());
            break;
    }
    return true;
}
function normaliseTaille(idDiv, idConteneur, elementChild, params) {
    var maxHeight = 0;
    var maxWidth = 0;
    var maxTaille = new Array();
    $$("#" + idConteneur + " " + elementChild).each(function (obj) {
        if (getVersionIE() < 9) {
            if (obj.clientHeight >= maxHeight)maxHeight = obj.clientHeight;
            if (obj.clientWidth >= maxWidth)maxWidth = obj.clientWidth;
        } else {
            if (obj.offsetHeight >= maxHeight)maxHeight = obj.offsetHeight;
            if (obj.offsetWidth >= maxWidth)maxWidth = obj.offsetWidth;
        }
    });
    if (params.conteneur) {
        $$("#" + idConteneur).each(function (obj1) {
            if (params.height) {
                if (getVersionIE() < 9)obj1.style.height = parseInt(maxHeight) + "px"; else obj1.style.height = parseInt(maxHeight) + 10 + "px";
            }
            if (params.width) {
                if (getVersionIE() < 9)obj1.style.width = parseInt(maxWidth) + 10 + "px"; else obj1.style.width = parseInt(maxWidth) + 10 + "px";
            }
        });
    }
    $$("#" + idConteneur + " " + elementChild).each(function (obj) {
        if (params.height) {
            if (getVersionIE() < 9)obj.style.height = parseInt(maxHeight) - 10 + "px"; else obj.style.height = parseInt(maxHeight) + "px";
        }
        if (params.width) {
            if (getVersionIE() < 9)obj.style.width = parseInt(maxWidth) - 10 + "px"; else obj.style.width = parseInt(maxWidth) + "px";
        }
    });
    maxTaille['h'] = maxHeight;
    maxTaille['w'] = maxWidth;
    return maxTaille;
}
function setActionSurDiaporama() {
    if (jQuery(".div_mediaDiapoPage").length > 0) {
        jQuery(".div_mediaDiapoPage").each(function () {
            if (jQuery(this).find("li").length > 1) {
                var time = jQuery(this).attr("data-temps");
                var hauteur = jQuery(this).attr("data-hauteur");
                var largeur = jQuery(this).attr("data-largeur");
                var afficherNavigation = jQuery(this).attr("data-navigation");
                var status_controls = false;
                if (afficherNavigation == '1') {
                    status_controls = true;
                }
                if (jQuery(this).attr("data-sudoslider") == '1') {
                    var auto = false;
                    if (time > 0) {
                        time *= 1000;
                        auto = true
                    }
                    jQuery(this).css('width', largeur + 'px');
                    jQuery(this).css('position', 'relative');
                    jQuery(this).css('overflow', 'hidden');
                    jQuery(this).children('ul').css('position', 'relative');
                    var sudoSliderLook = jQuery(this).sudoSlider({
                        autowidth: false,
                        slideCount: 1,
                        moveCount: 1,
                        pause: time,
                        auto: auto
                    });
                }
                else if (time > 0) {
                    jQuery(this).jDiaporama({
                        delay: time,
                        theme: "default",
                        useThumbs: false,
                        width: largeur,
                        height: hauteur,
                        transition: "fade",
                        status_controls: status_controls,
                        keyboard: false,
                        infos: true,
                        onrollover: false,
                        currentimage: status_controls,
                        controls: status_controls,
                        constraintWidth: false
                    });
                }
            }
        });
    }
    if (jQuery(".SudoSlider_numeric").length > 0) {
        jQuery(".SudoSlider_numeric").each(function () {
            var sudoSlider = jQuery(this).sudoSlider({fade: true, crossFade: false, numeric: true, prevNext: false});
        });
    }
    if (jQuery(".SudoSlider_auto").length > 0) {
        jQuery(".SudoSlider_auto").each(function () {
            var sudoSlider = jQuery(this).sudoSlider({fade: true, auto: true, prevNext: false});
        });
    }
    if (jQuery(".iteaV5_responsiveSlides").length > 0) {
        jQuery(".iteaV5_responsiveSlides").each(function () {
            var time = 1000 * jQuery(this).attr("data-temps");
            var speed = jQuery(this).attr("data-speed");
            var nav = false;
            var auto = true;
            if (jQuery(this).attr("data-auto") == "false") {
                var auto = false;
            }
            if (jQuery(this).attr("data-nav") == '1') {
                nav = true;
            }
            if (!speed) {
                speed = 500;
            }
            jQuery(this).responsiveSlides({
                timeout: time,
                speed: speed,
                nav: nav,
                pager: nav,
                prevText: "",
                nextText: "",
                auto: auto
            });
        });
    }
}
function afficheNextImgInDiapo() {
    $$('.div_mediaDiapoPage').each(function (elt) {
        var divImgAAfficher = $(elt.childNodes[0]);
        var listeMediaDispoInDiapo = $(elt.childNodes[2]).children;
        if (window.compteurImgInDiapoMedia[elt.id] == undefined) {
            if ($(elt.childNodes[2]).children.length > 2)window.compteurImgInDiapoMedia[elt.id] = 1; else window.compteurImgInDiapoMedia[elt.id] = 0;
        }
        divImgAAfficher.childNodes[0].style.position = "absolute";
        divImgAAfficher.childNodes[1].style.position = "absolute";
        if ($(divImgAAfficher.childNodes[0]).style.display == "none") {
            $(divImgAAfficher.childNodes[0]).appear({duration: 1.5, from: 0.0, to: 1.0});
            $(divImgAAfficher.childNodes[1]).fade({duration: 1.5, from: 1.0, to: 0.0});
        }
        if ($(divImgAAfficher.childNodes[1]).style.display == "none") {
            $(divImgAAfficher.childNodes[1]).appear({duration: 1.5, from: 0.0, to: 1.0});
            $(divImgAAfficher.childNodes[0]).fade({duration: 1.5, from: 1.0, to: 0.0});
        }
        if ($(divImgAAfficher.childNodes[0]).style.display == "none") {
            $(divImgAAfficher.childNodes[0]).src = $(listeMediaDispoInDiapo[window.compteurImgInDiapoMedia[elt.id]]).readAttribute("source");
        } else $(divImgAAfficher.childNodes[1]).src = $(listeMediaDispoInDiapo[window.compteurImgInDiapoMedia[elt.id]]).readAttribute("source");
        window.compteurImgInDiapoMedia[elt.id] += 1;
        if (window.compteurImgInDiapoMedia[elt.id] >= $(elt.childNodes[2]).children.length) {
            window.compteurImgInDiapoMedia[elt.id] = 0;
        }
    });
}
function blindUpDown(idDiv) {
    var div = $(idDiv);
    if (!div)return;
    if (div.showing != true) {
        div.showing = true;
        Effect.BlindDown($(div), {duration: 0.5});
    }
    else {
        div.showing = false;
        Effect.BlindUp($(div), {duration: 0.5});
    }
}
function blindUpDownByClass(classe) {
    var elems = $$(classe);
    if (!elems)return;
    elems.each(function (elem) {
        blindUpDown(elem.identify());
    });
}
function chargeMotCleDansDiv(idDiv, motCle) {
    if (!window.jsonMotcle)window.jsonMotcle = [];
    for (var i = 0; i < window.jsonMotcle.length; i++) {
        if (window.jsonMotcle[i].motcle == motCle) {
            if ($(idDiv))$(idDiv).innerHTML = window.jsonMotcle[i].content;
            return;
        }
    }
    var adr = "/lib_2/ajax/contenuFenetre.php";
    var sending = getInfoSession() + "&element=motCle&typeInfo=motcle&val=" + motCle;
    appelAjaxToFunc(adr, sending, function (reponse) {
        window.jsonMotcle.push({'motcle': motCle, 'content': reponse});
        window.jsonMotcle.uniq();
        if ($(idDiv))$(idDiv).innerHTML = reponse;
    });
}
function chargeInformationKML(urlInformation) {
    var xmlhttp = creeObjHttpRequest();
    xmlhttp.open("GET", urlInformation, false);
    xmlhttp.send();
    xmlDoc = xmlhttp.responseXML;
    var url = "";
    var id = "";
    var tabInfos = new Array();
    var length = xmlDoc.getElementsByTagName("KML").length;
    for (var i = 0; i < length; i++) {
        id = xmlDoc.getElementsByTagName("KML")[i].getAttribute("id");
        url = xmlDoc.getElementsByTagName("KML")[i].childNodes[0].nodeValue;
        tabInfos[i] = new Array();
        tabInfos[i]["url"] = url;
        tabInfos[i]["id"] = id;
    }
    return tabInfos;
}
function getInformationKMLByRep(foncQdfini) {
    var url = "/lib_2/ajax/google_map.php";
    var sending = "CMD=infosKml";
    var xhr_local = creeObjHttpRequest();
    xhr_local.onreadystatechange = function () {
        if (xhr_local.readyState == 4 && xhr_local.status == 200) {
            var reponse = eval('(' + xhr_local.responseText + ')');
            if (foncQdfini)foncQdfini(reponse);
        }
    }
    xhr_local.open("POST", url, true);
    xhr_local.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr_local.send(sending);
}
function iteaGMAP_initForFiche(icon, reload, mapType) {
    if (!window.iconGMAP) {
        window.iconGMAP = icon;
    }
    if (loadScriptGoogleMap()) {
        return;
    }
    if (window.iconGMAP) {
        icon = window.iconGMAP;
    }
    if (!icon) {
        icon = null;
    }
    if (!reload) {
        reload = false;
    }
    $$(".div_itea_GMAP").each(function (obj) {
        if (!jQuery(obj).is(':hidden')) {
            if (reload) {
                var mapInstancie = window.gmap || false;
                reload = false;
                if (mapInstancie) {
                    reload = true;
                }
            }
            var lat = obj.getAttribute("latitude");
            var lng = obj.getAttribute("longitude");
            var zoom = 8;
            var latCarte;
            var lngCarte;
            if (obj.getAttribute("zoom").length > 0) {
                zoom = obj.getAttribute("zoom");
            }
            if (obj.getAttribute("picto").length > 0)
                icon = obj.getAttribute("picto");
            if (reload) {
                zoom = window.gmap.getZoom();
                var centreCarte = window.gmap.getCentre();
                latCarte = centreCarte.lat();
                lngCarte = centreCarte.lng();
            } else {
                latCarte = lat;
                lngCarte = lng;
                mapType = 'roadmap';
            }
            switch (mapType) {
                case'satellite':
                    mapType = google.maps.MapTypeId.SATELLITE;
                    break;
                case'roadmap':
                    mapType = google.maps.MapTypeId.ROADMAP;
                    break;
                default:
                    mapType = window.gmap.getMapType();
                    break;
            }
            window.gmap = new ObjGoogleMap(latCarte, lngCarte, zoom, null, null, null, mapType, obj.id, false);
            var kml = obj.getAttribute("data-kml");
            if (kml) {
                var testKML = new google.maps.KmlLayer({map: window.gmap.google_map, url: kml, preserveViewport: true});
            }
            var centre = new google.maps.LatLng(lat, lng);
            window.gmap.addMarker(centre, icon, null, null, null);
        }
    });
}
function iteaGMAP_initForListe(idDiv) {
    window.foncGMap = 'iteaGMAP_initForListe';
    window.idDivGMap = idDiv;
    if (loadScriptGoogleMap()) {
        return;
    }
    var obj = $(idDiv);
    var lat = obj.getAttribute("latitude");
    var lng = obj.getAttribute("longitude");
    var icon = null;
    var zoom = 8;
    if (obj.getAttribute("zoom").length > 0) {
        zoom = obj.getAttribute("zoom");
    }
    var latCarte = lat;
    var lngCarte = lng;
    var mapType = google.maps.MapTypeId.ROADMAP;
    window.gmap = new ObjGoogleMap(latCarte, lngCarte, zoom, null, null, null, mapType, obj.id, false);
    var centre = new google.maps.LatLng(lat, lng);
    window.gmap.addMarker(centre, icon, null, null, null);
}
function iteaGmapImage(idDiv, largeur, hauteur) {
    var obj = $(idDiv);
    var zoom = 8;
    if (!largeur) {
        largeur = 200;
    }
    if (!hauteur) {
        hauteur = 200;
    }
    var latCarte = obj.getAttribute("latitude");
    var lngCarte = obj.getAttribute("longitude");
    var url = "http://maps.googleapis.com/maps/api/staticmap?center=" + latCarte + "," + lngCarte + "&zoom=" + zoom + "&size=" + largeur + "x" + hauteur + "&markers=" + latCarte + "," + lngCarte + "&sensor=false";
    var lnk = "http://maps.google.com/maps?q=" + latCarte + "," + lngCarte + "&z=" + zoom;
    var container = document.getElementById(idDiv);
    var codeHTML = "<a target='_blank' href='" + lnk + "'><img src='" + url + "' alt='google map' />";
    if (obj.getAttribute("data-lblzoom").length > 0) {
        codeHTML += "<span class='lblzoom'>" + obj.getAttribute("data-lblzoom") + "</span>";
    }
    codeHTML += "</a>";
    container.innerHTML = codeHTML;
}
function afficheItineraireInDiv() {
    (function ($) {
        var reponse = "<div id='divGmapItinerairePlan'></div><div id='divGmapItineraireText'></div>";
        afficheDivAvecTransparence(reponse, 610, 500, "");
        $('#divGmapItinerairePlan').css('width', "300px");
        $('#divGmapItinerairePlan').css('height', "500px");
        $('#divGmapItinerairePlan').css('cssFloat', "left");
        var imgBtFermer = $("<img src='/config_v3/imgs_defaut/btFermerPhoto.png' class='img_navigateur'/>");
        $(imgBtFermer).css('top', "-18px");
        $(imgBtFermer).css('right', "-18px");
        $(imgBtFermer).css('position', "absolute");
        $(imgBtFermer).css('cursor', "pointer");
        $(imgBtFermer).click(function () {
            effaceDivAvecTransparence();
        });
        $('#divGraph_fenetre').append(imgBtFermer);
        $('#divGraph_fenetre').css('border', "8px solid #000000");
        $('#divGraph_fenetre').css('padding', "8px");
        var ville = '';
        var codePostal = '';
        if ($('#inpt_villeGmap').length > 0) {
            ville = $('#inpt_villeGmap').val();
        }
        if ($('#inpt_codePostaleGmap').length > 0) {
            codePostal = $('#inpt_codePostaleGmap').val();
        }
        var parametre = {addr: $('#inpt_adresseGmap').val(), ville: ville, codePostal: codePostal};
        window.iteaGMAP_initItineraire(parametre);
    })(jQuery);
}
function iteaGMAP_initItineraire(param) {
    var gmap = window.gmap || false;
    var lat, lng;
    if (jQuery(".div_itea_GMAP").length > 0) {
        var divMap = jQuery(".div_itea_GMAP")[0];
        lat = jQuery(divMap).attr("latitude");
        lng = jQuery(divMap).attr("longitude");
    }
    if (!lat && !lng) {
        if (gmap) {
            lat = window.gmap.getCentre().lat();
            lng = window.gmap.getCentre().lng();
        }
    }
    window.gmap2 = new ObjGoogleMap(lat, lng, 8, null, null, null, google.maps.MapTypeId.ROADMAP, "divGmapItinerairePlan", false, google.maps.MapTypeControlStyle.DROPDOWN_MENU);
    var centre = new google.maps.LatLng(lat, lng);
    window.gmap2.addMarker(centre, null, null, null, null);
    window.gmap2.construireItineraire(window.gmap2, param.addr, param.ville, param.codePostal);
}
function stopAjaxForCarte() {
    window.stop();
    if (window.gmap)window.gmap.reload();
}
function iteaGMAPStreetView_initForFiche(paramsCarte, paramsStreetView) {
    if (loadScriptGoogleMap()) {
        return;
    }
    if ($$(".div_itea_GMAP").length == 0 && $("div_itea_streetView") == undefined) {
        return;
    }
    if ($$(".div_itea_GMAP_parametrable").length == 0 && $('div_fiche_streetView') == undefined) {
        iteaGMAP_initForFiche(paramsCarte.img);
        return;
    } else if ($("div_itea_streetView") && $("div_itea_streetView").getAttribute('data-chargercartoetsv') == '1') {
        iteaGMAP_initForFiche(paramsCarte.img);
    }
    (function ($) {
        if (paramsCarte) {
            $.data($('body')[0], 'paramsCarte', paramsCarte);
            $.data($('body')[0], 'paramsStreetView', paramsStreetView);
        }
        else {
            paramsCarte = $.data($('body')[0], 'paramsCarte');
            paramsStreetView = $.data($('body')[0], 'paramsStreetView');
        }
        var pitch = 5;
        var zoom = 1;
        var heading = 0;
        if ($("#div_itea_streetView").length > 0 && $("#div_itea_streetView").attr('data-svparams').length > 0) {
            var tabParams = $("#div_itea_streetView").attr('data-svparams').split(',');
            var estNouveauCBP = false;
            if (tabParams.length == 3) {
                $.each(tabParams, function (key, value) {
                    valtmp = value.substr(0, (value.length - 1));
                    if (valtmp.length > 0) {
                        switch (value.substr((value.length - 1), 1)) {
                            case'h':
                                heading = valtmp;
                                paramsStreetView.heading = valtmp;
                                estNouveauCBP = true;
                                break;
                            case'y':
                                zoom = 0;
                                if (valtmp < 65) {
                                    zoom = 1;
                                }
                                if (valtmp < 40) {
                                    zoom = 2;
                                }
                                if (valtmp < 20) {
                                    zoom = 3;
                                }
                                if (valtmp < 15) {
                                    zoom = 4;
                                }
                                paramsStreetView.zoom = zoom;
                                estNouveauCBP = true;
                                break;
                            case't':
                                pitch = valtmp - 90;
                                paramsStreetView.pitch = pitch;
                                estNouveauCBP = true;
                                break;
                        }
                    }
                })
            }
            if (!estNouveauCBP) {
                paramsStreetView.heading = tabParams[1];
                if (tabParams[2] > 1) {
                    paramsStreetView.fov = tabParams[2];
                }
                paramsStreetView.zoom = tabParams[3];
                if (tabParams[4]) {
                    paramsStreetView.pitch = tabParams[4];
                } else {
                    paramsStreetView.pitch = 0;
                }
                heading = parseInt(paramsStreetView.heading);
                zoom = parseInt(paramsStreetView.zoom);
                pitch = parseInt(paramsStreetView.pitch);
            }
        }
        var mapManager = {
            sv: new google.maps.StreetViewService(),
            map: null,
            divMap: null,
            divView: null,
            panorama: null,
            setMap: function (divMap, mapOptions) {
                this.map = new google.maps.Map(divMap, mapOptions);
            },
            processSVData: function (data, status) {
                if (status == google.maps.StreetViewStatus.UNKNOWN_ERROR || ($("#div_itea_streetView").attr('data-cachersierreur') == '1' && status == google.maps.StreetViewStatus.ZERO_RESULTS)) {
                    $("#div_itea_streetView").hide();
                    if ($("#titrestreetview")) {
                        $("#titrestreetview").hide();
                    }
                }
            },
            gll: null,
            setGll: function (lat, lng) {
                this.gll = new google.maps.LatLng(lat, lng);
            },
            mapOptions: {},
            heading: heading,
            pitch: pitch,
            zoom: zoom,
            setPanoramaForMap: function () {
                var panoOptions = {
                    position: this.gll,
                    pov: ({heading: this.heading, zoom: this.zoom, pitch: this.pitch})
                };
                var panorama = new google.maps.StreetViewPanorama($("#div_itea_streetView")[0], panoOptions);
                this.map.setStreetView(panorama);
                this.sv.getPanoramaByLocation(this.gll, 20, this.processSVData);
            },
            setPanorama: function () {
                var panoOptions = {
                    position: this.gll,
                    pov: ({heading: this.heading, zoom: this.zoom, pitch: this.pitch})
                };
                this.panorama = new google.maps.StreetViewPanorama($("#div_itea_streetView")[0], panoOptions);
                this.sv.getPanoramaByLocation(this.gll, 20, this.processSVData);
            }
        }
        mapManager.divMap = $("#div_itea_GMAP_parametrable")[0];
        mapManager.divView = $("#div_itea_streetView")[0];
        var zoom;
        if (mapManager.divMap != undefined) {
            zoom = $(mapManager.divMap).attr('zoom');
            var lat = $(mapManager.divMap).attr("latitude");
            var lng = $(mapManager.divMap).attr("longitude");
            var mapWidth = $(mapManager.divMap).width();
            var mapHeight = $(mapManager.divMap).height();
        }
        if (mapManager.divView != undefined) {
            zoom = $(mapManager.divView).attr('zoom');
            var lat = $(mapManager.divView).attr("latitude");
            var lng = $(mapManager.divView).attr("longitude");
            var streetWidth = $('#div_fiche_streetView').width();
            var streetHeight = $('#div_fiche_streetView').height();
            if (!streetWidth) {
                streetWidth = $('#div_itea_streetView').width();
            }
            if (!streetHeight) {
                streetHeight = $('#div_itea_streetView').height();
            }
            if (paramsStreetView.pitch) {
                mapManager.ptich = parseInt(paramsStreetView.pitch);
            }
            if (paramsStreetView.heading)mapManager.heading = parseInt(paramsStreetView.heading);
            if (paramsStreetView.zoom)mapManager.zoom = parseInt(paramsStreetView.zoom);
            if (paramsStreetView.img) {
                var ico = paramsStreetView.img;
            }
            else {
                var ico = "/config_v3/imgs_defaut/google_map/punaise.png";
            }
            var srcStreet = "http://maps.googleapis.com/maps/api/streetview?size=" + streetWidth + "x" + streetHeight + "&location=" + lat + "," + lng + "&heading=" + paramsStreetView.heading;
            if (paramsStreetView.fov > 1) {
                srcStreet += "&fov=" + paramsStreetView.fov;
            }
            srcStreet += "&pitch=" + paramsStreetView.pitch + "&sensor=false";
            if (jQuery('#div_htmlFinITEAUturoa').length > 0 || jQuery('#div_htmlFinITEAHao').length > 0) {
                console.log('urlStreeetview: (visible que chez itea)')
                console.log(srcStreet)
            }
        }
        if (typeof(zoom) == 'undefined' || zoom == null) {
            if (paramsCarte)
                zoom = parseInt(paramsCarte.z);
            if ($(mapManager.divMap).attr('zoom'))
                zoom = parseInt($(mapManager.divMap).attr('zoom'));
            if (!zoom) {
                zoom = 11;
            }
        }
        else {
            zoom = parseInt(zoom);
        }
        if (paramsCarte.img) {
            var ico = paramsCarte.img;
        }
        else {
            var ico = $(mapManager.divMap).attr('picto');
        }
        if (mapManager.divMap != undefined) {
            if (paramsCarte.embed) {
                var src = "http://maps.googleapis.com/maps/api/staticmap?center=" + lat + "," + lng + "&zoom=" + zoom + "&size=" + mapWidth + "x" + mapHeight + "&maptype=roadmap&markers=color:green%7Clabel:G%7C" + lat + "," + lng + "&sensor=false";
                $(mapManager.divMap).html('<img src="' + src + '" width="100%" height="100%" />');
            }
            else {
                mapManager.setGll(lat, lng);
                mapManager.mapOptions = {center: mapManager.gll, zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP};
                mapManager.setMap(mapManager.divMap, mapManager.mapOptions);
                var marker = new google.maps.Marker({map: mapManager.map, position: mapManager.gll, icon: ico});
            }
        }
        if (mapManager.divView != undefined) {
            if (paramsStreetView.embed) {
                $(mapManager.divView).html('<img src="' + srcStreet + '" width="100%" height="100%" />');
            }
            else {
                if (paramsCarte.embed || mapManager.divMap == undefined) {
                    mapManager.setGll(lat, lng);
                    mapManager.setPanorama();
                    var marker = new google.maps.Marker({
                        position: mapManager.gll,
                        map: mapManager.panorama,
                        icon: ico
                    });
                }
                else {
                    mapManager.setPanoramaForMap();
                }
            }
        }
    })(jQuery);
}
window.gmapIsInit = false;
function loadScriptGoogleMap() {
    if (!window.typeGmap) {
        return true;
    }
    var retour = false;
    (function ($) {
        if (window.gmapIsInit === false) {
            window.gmapIsInit = true;
            retour = true;
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'http://maps.googleapis.com/maps/api/js?sensor=FALSE&callback=chargeGMap';
            if (window.gmapKey) {
                script.src += '&key=' + window.gmapKey;
            }
            document.body.appendChild(script);
        }
    })(jQuery);
    return retour;
}
function chargeGMap() {
    var scriptMap = document.createElement("script");
    scriptMap.type = 'text/javascript';
    scriptMap.src = '/lib_2/js/api/map-ui/jquery.ui.map-min.js';
    scriptMap.onload = scriptMap.onreadystatechange = function () {
        scriptMap.onreadystatechange = scriptMap.onload = null;
        var scriptMapExt = document.createElement('script');
        scriptMapExt.type = 'text/javascript';
        scriptMapExt.src = '/lib_2/js/api/map-ui/jquery.ui.map-min.extensions.js';
        document.body.appendChild(scriptMapExt);
        lanceFoncsInitGMap();
    }
    document.body.appendChild(scriptMap);
}
function lanceFoncsInitGMap() {
    (function ($) {
        if (window.foncGMap && window.idDivGMap) {
            if (window.foncGMap == 'iteaGMAP_initForListe') {
                iteaGMAP_initForListe(window.idDivGMap);
                window.foncGMap = null;
                window.idDivGMap = null;
            }
        } else {
            if (window.typeGmap == "classique") {
                var params = getParamsGoogleMap('classique');
                iteaGMap_init(params);
            } else if (window.typeGmap == "streetView") {
                var params = getParamsGoogleMap('streetView');
                iteaGMAPStreetView_initForFiche(params.carte, params.streetView);
            }
        }
    })(jQuery);
}
function getParamsGoogleMap(typeGoogleMap) {
    var retour;
    (function ($) {
        $.ajax({
            type: 'POST',
            url: '/lib_2/ajax/google_map.php',
            async: false,
            data: {cmd: 'getParamsGoogleMap', typegmap: typeGoogleMap},
            dataType: 'json',
            success: function (result) {
                retour = result;
            }
        });
    })(jQuery);
    return retour;
}
function verifEtInitGoogleMap() {
    (function ($) {
        if ($('#divgmap3:visible').length > 0 || $('.div_itea_GMAP:visible').length > 0) {
            loadScriptGoogleMap();
        }
    })(jQuery);
}
function getNewDivToBody(ident, classe) {
    var objBody = document.getElementsByTagName("body").item(0);
    return getNewDivChild(objBody, ident, classe);
}
function getNewDivChild(objParent, ident, classe) {
    var newdiv = document.createElement("DIV");
    newdiv.id = ident;
    setClassForObj(newdiv, classe);
    objParent.appendChild(newdiv);
    return newdiv;
}
function getLargeurWindow() {
    var w;
    if (getVersionIE() < 6)w = (document.documentElement.clientWidth); else {
        if (getVersionIE() < 9) {
            if (document.viewport && document.viewport.getWidth() > 0)w = document.viewport.getWidth(); else w = (document.body.offsetWidth);
        }
        else w = (window.innerWidth);
    }
    return parseInt(w);
}
function getHauteurWindow() {
    var h;
    if (getVersionIE() < 6)h = (document.documentElement.clientHeight); else {
        if (getVersionIE() < 9) {
            if (document.viewport && document.viewport.getHeight() > 0)h = document.viewport.getHeight(); else h = (document.body.offsetHeight);
        }
        else h = (window.innerHeight);
    }
    if (h < 40 && getVersionIE() < 9 && getVersionIE() > 5)h = (document.documentElement.clientHeight);
    return parseInt(h);
}
function getLargeurReelleImage(objImg) {
    var l;
    if (getVersionIE() < 9) {
        l = objImg.clientWidth;
    } else l = objImg.naturalWidth;
    return parseInt(l);
}
function getHauteurReelleImage(objImg) {
    var h;
    if (getVersionIE() < 9)h = objImg.clientHeight; else h = objImg.naturalHeight;
    return parseInt(h);
}
function afficheDivAvecTransparence(html, w, h, suffixe, titreDiv) {
    if (!suffixe || suffixe == undefined)suffixe = "";
    var hW = getHauteurWindow();
    var lW = getLargeurWindow();
    if (hW < 40)hW = 40;
    if (lW < 40)lW = 40;
    if (h > hW)h = hW - 40;
    if (w > lW)w = lW - 40;
    var divGene = document.getElementById("divGraph_affFenetre" + suffixe);
    if (!divGene)divGene = getNewDivToBody("divGraph_affFenetre" + suffixe, "divGraph" + suffixe);
    if (getVersionIE() < 9)divGene.style.position = "absolute"; else divGene.style.position = "fixed";
    if (getVersionIE() < 9) {
        var objBody = document.getElementsByTagName("body").item(0);
        objBody.style.height = "100%";
    }
    divGene.style.zIndex = "900000";
    divGene.style.left = "0px";
    divGene.style.top = "0px";
    divGene.style.width = "100%";
    divGene.style.height = "100%";
    divGene.style.opacity = 0.2;
    divGene.style.backgroundColor = "#000000";
    divGene.style.display = "block";
    divGene.style.filter = "alpha(opacity=70)";
    var divFerme = document.getElementById("divGraph_fermeFenetre" + suffixe);
    if (!divFerme)divFerme = getNewDivToBody("divGraph_fermeFenetre" + suffixe, "divGraphFerme" + suffixe);
    if (getVersionIE() < 9)divFerme.style.position = "absolute"; else divFerme.style.position = "fixed";
    divFerme.style.zIndex = "900001";
    divFerme.style.right = "10px";
    divFerme.style.top = "10px";
    divFerme.style.display = "block";
    divFerme.innerHTML = '<div class="divGraph_fermeFenetreContent" onclick="effaceDivAvecTransparence();"><a href="javascript:void(0);" style="text-decoration:none;"></a></div>';
    var divMsg = document.getElementById("divGraph_fenetre" + suffixe);
    if (!divMsg)divMsg = getNewDivToBody("divGraph_fenetre" + suffixe, "divGraph" + suffixe);
    if (getVersionIE() < 9)divMsg.style.position = "absolute"; else divMsg.style.position = "fixed";
    divMsg.style.zIndex = "1000000";
    divMsg.style.backgroundColor = "#FFFFFF";
    divMsg.style.width = w + "px";
    divMsg.style.height = h + "px";
    divMsg.style.opacity = 1;
    divMsg.style.marginLeft = "-" + (w / 2) + "px";
    divMsg.style.marginTop = "-" + (h / 2) + "px";
    divMsg.style.left = "50%";
    divMsg.style.top = "50%";
    divMsg.style.display = "block";
    if (getVersionIE() < 9) {
        divGene.style.minHeight = "1px";
        var yscroll = document.body.scrollTop;
        if (!yscroll)yscroll = document.documentElement.scrollTop;
        divGene.style.top = yscroll + "px";
        divMsg.style.marginTop = null;
        divMsg.style.top = (yscroll + 50) + "px";
        function setForScroll(evt) {
            var yscroll = document.body.scrollTop;
            if (!yscroll)yscroll = document.documentElement.scrollTop;
            var divGene = document.getElementById("divGraph_affFenetre" + suffixe);
            var divMsg = document.getElementById("divGraph_fenetre" + suffixe);
            divGene.style.top = yscroll + "px";
            divMsg.style.marginTop = null;
            divMsg.style.top = parseInt(yscroll + 50) + "px";
        }

        document.onmousewheel = setForScroll;
        window.onscroll = setForScroll;
    }
    if (titreDiv)html = "<div id='div_btnCloseFrmResa' class='div_headPopin'><p><span class='sp_titrePopin'>" + titreDiv + "</span><a href='#ferme' onClick='effaceDivAvecTransparence();' class='a_fermePopin' title='fermer'><img src='/config_v3/imgs_defaut/v5/fermer-popin.gif' alt='fermer'/></a></p></div>" + html;
    divMsg.innerHTML = unescape(html);
    if (window.Effect)new Effect.Opacity($(divGene), {from: 0.2, to: 0.7});
    if (getVersionIE() < 7) {
        var tabObjSelect = document.getElementsByTagName("SELECT");
        for (var i = 0; i < tabObjSelect.length && tabObjSelect[i]; i++)tabObjSelect[i].style.visibility = "hidden";
    }
    Event.observe(document, 'keyup', function (event) {
        if (event.keyCode == Event.KEY_ESC) {
            effaceDivAvecTransparence(suffixe);
            Event.stopObserving(document, 'keyup');
        }
    });
}
function checkPageSiDivForChargePrixInLst() {
    $$(".itea_divForLoadNewPrixInLstForDate").each(function (elt) {
        if (!elt.getAttribute("deb"))return;
        var url = "lib_2/ajax/infosDist.php";
        var sending = "info=SETPXINOBJLST&deb=" + elt.getAttribute("deb") + "&nbj=" + elt.getAttribute("nbj");
        appelAjaxToFunc(url, sending, function (reponse) {
        });
    });
    $$(".itea_divForDispoBaseNatForDate").each(function (elt) {
        $$(".div_bt_reserverDispogiteFNGF").each(function (elt) {
            elt.style.display = "none";
        });
        var url = "lib_2/ajax/infosDist.php";
        if (!elt.getAttribute("deb"))return;
        var sending = "info=SETDISPOINOBJLSTDBNAT&instance_exe=" + elt.getAttribute("instance_exe") + "&instance=" + elt.getAttribute("instance") + "&dpt=" + elt.getAttribute("dpt") + "&type_gite=" + elt.getAttribute("type_gite") + "&id_famille=" + elt.getAttribute("id_famille") + "&deb=" + elt.getAttribute("deb") + "&nbj=" + elt.getAttribute("nbj") + "&ope=" + elt.getAttribute("ope");
        appelAjaxToFunc(url, sending, function (reponse) {
            if (reponse) {
                checkPageAfficheBtResaSiDispogiteResa();
                checkPageSiDivForNbResult();
                checkNombrePage();
            }
        });
    });
    var tabExec = new Array();
    $$(".itea_divForPrixBaseNatForDate").each(function (elt) {
        var url = "lib_2/ajax/infosDist.php";
        if (!elt.getAttribute("deb"))return;
        if (tabExec[elt.getAttribute("instance_exe") + "_" + elt.getAttribute("dpt") + "_" + elt.getAttribute("type_gite") + "_" + elt.getAttribute("id_famille") + "_" + elt.getAttribute("deb") + "_" + elt.getAttribute("nbj")] != true) {
            var sending = "info=SETPXINOBJLSTDBNAT&instance_exe=" + elt.getAttribute("instance_exe") + "&instance=" + elt.getAttribute("instance") + "&dpt=" + elt.getAttribute("dpt") + "&type_gite=" + elt.getAttribute("type_gite") + "&id_famille=" + elt.getAttribute("id_famille") + "&deb=" + elt.getAttribute("deb") + "&nbj=" + elt.getAttribute("nbj") + "&ope=" + elt.getAttribute("ope") + "&pomxj=" + elt.getAttribute("pomxj");
            tabExec[elt.getAttribute("instance_exe") + "_" + elt.getAttribute("dpt") + "_" + elt.getAttribute("type_gite") + "_" + elt.getAttribute("id_famille") + "_" + elt.getAttribute("deb") + "_" + elt.getAttribute("nbj")] = true;
            appelAjaxToFunc(url, sending, function (reponse) {
                gereAffichageTriParPrix(reponse);
            });
        }
    });
}
function checkPageAfficheBtResaSiDispogiteResa() {
    var url = "lib_2/ajax/infosDist.php";
    var sending = "info=GETIDENTDISPOGITERESERVABLE";
    appelAjaxToFunc(url, sending, function (reponse) {
        if (reponse) {
            var tabIdentBtAAfficher = new String(reponse).evalJSON();
            $A(tabIdentBtAAfficher).each(function (ident) {
                var bt = $("btResaDispoGite_" + ident);
                if (bt)bt.style.display = "block";
            });
        }
    });
}
function checkPageSiDivForNbResult() {
    if (!getCookie("__sess_") && !getCookie("__sessV5_") && window.foncQdPadCookie) {
        window.foncQdPadCookie();
        return false;
    }
    $$(".itea_div_liste_infoNbResultat_ajx").each(function (elt) {
        var adr = "/lib_2/ajax/contenuFenetre.php";
        var sending = "element=objProd&typeInfo=getNbResult";
        sending += "&CGISCUR=" + escape(getQueryString());
        if (estSurPanier())sending += "&mode=panier";
        appelAjaxToFunc(adr, sending, function (reponse) {
            if (reponse)$(elt).update(reponse);
            if (window.refreshNbPageInNav)window.refreshNbPageInNav();
        });
    });
    $$(".itea_div_liste_infoDetailsNbResultatGestionProp_ajx").each(function (elt) {
        var adr = "/lib_2/ajax/contenuFenetre.php";
        var sending = "element=objProd&typeInfo=getNbResultDetailsProp";
        sending += "&CGISCUR=" + escape(getQueryString());
        appelAjaxToFunc(adr, sending, function (reponse) {
            if (reponse)$(elt).update(reponse);
        });
    });
    $$('.itea_div_liste_InfoCritCourant').each(function (elt) {
        var adr = "/lib_2/ajax/contenuFenetre.php";
        var sending = "element=objProd&typeInfo=getInfoCritCourant";
        sending += "&CGISCUR=" + escape(getQueryString());
        if (estSurPanier())sending += "&mode=panier";
        elt.innerHTML = "";
        affMsgAttenteInDiv(elt.id);
        appelAjaxToFunc(adr, sending, function (reponse) {
            if (reponse)$(elt).update(reponse);
        });
    });
}
function checkPageSiDivForAbecedaireCommune() {
    $$(".itea_divForABCDEF_commune").each(function (elt) {
        var adr = "/lib_2/ajax/contenuFenetre.php";
        var sending = "element=objProd&typeInfo=abcdef_commune";
        appelAjaxToFunc(adr, sending, function (reponse) {
            if (reponse) {
                $(elt).style.display = "block";
                $(elt).update(reponse);
            }
        });
    });
}
function goToDansListeByPageEtId(numPage, pageCurr, idSeq, tabDiv) {
    if (numPage == pageCurr) {
        Effect.ScrollTo('liLst_elem_' + idSeq);
        scrollToAncre('liLst_elem_' + idSeq);
    } else {
        window.idSeqToScroll = idSeq;
        window.numPageSuiv = numPage;
        window.numPageCurr = pageCurr;
        afficheListeByAjx_setPage_v2(tabDiv, numPage, function () {
            goToNavigPage('li_navigListeNumeroPage', window.numPageSuiv, window.numPageCurr, 'li_navigListeNumeroPageSelect');
            scrollToAncre('liLst_elem_' + window.idSeqToScroll);
            Effect.ScrollTo('liLst_elem_' + window.idSeqToScroll);
        });
    }
}
function getInfoArboDiv() {
    var i = 0;
    var infos = "[";
    $$(".iteaListeArboDiv").each(function (obj) {
        infos += '{"arboDiv":"' + obj.readAttribute("arboDiv") + '",';
        infos += '"ID":"' + obj.readAttribute("ID") + '"},';
        i++;
    });
    infos = infos.substr(0, infos.length - 1);
    infos += "]";
    return eval(infos);
}
function showResaInPopIn(addr, sending, w, h, titreDiv) {
    if (!w || !h) {
        if (getVersionIE() < 9) {
            w = parseInt(document.documentElement.clientWidth) * 0.9;
            h = parseInt(document.documentElement.clientHeight) * 0.9;
        } else {
            w = parseInt(window.innerWidth) * 0.9;
            h = parseInt(window.innerHeight) * 0.9;
        }
        if (!w)w = 800;
        if (!h)h = 600;
    }
    var html_init = "<iframe src='" + addr + "?" + sending + "' name='frame_resa' frameborder='0' id='frame_resa' width='" + w + "' height='100%'>\n\
       <img src=/config_v3/imgs_defaut/loading/roue16x16.gif /><br />\n\
      </iframe>";
    afficheDivAvecTransparenceAbsolue(html_init, w, h, null, titreDiv);
}
function showContactPropCentraleInPopIn(addr, w, h, titreDiv) {
    if (!w || !h) {
        if (getVersionIE() < 9) {
            w = parseInt(document.documentElement.clientWidth) * 0.9;
            h = parseInt(document.documentElement.clientHeight) * 0.9;
        } else {
            w = parseInt(window.innerWidth) * 0.9;
            h = parseInt(window.innerHeight) * 0.9;
        }
        if (!w)w = 800;
        if (!h)h = 600;
    }
    var html_init = "<iframe src='" + addr + "' name='frame_contact_prop_centrale' frameborder='0' id='frame_contact_prop_centrale' width='" + w + "' height='100%'>\n\
       <img src=/config_v3/imgs_defaut/loading/roue16x16.gif /><br />\n\
      </iframe>";
    afficheDivAvecTransparenceAbsolue(html_init, w, h, null, titreDiv);
}
function showTelPropInPopin(elt) {
    var infoTel = $(elt.children[1]);
    if (infoTel.hasClassName("span_lst_NumeroTelPropOuvert")) {
        infoTel.removeClassName("span_lst_NumeroTelPropOuvert");
        jQuery(elt).nextAll(".sp_infoContactPropParTel").removeClass("sp_infoContactPropParTelOuvert");
        jQuery(elt).toggleClass("open");
    } else {
        infoTel.addClassName("span_lst_NumeroTelPropOuvert");
        jQuery(elt).nextAll(".sp_infoContactPropParTel").addClass("sp_infoContactPropParTelOuvert");
        jQuery(elt).toggleClass("open");
    }
}
function getUrlWithLstCgi(lstCgis, urlListe, queryString) {
    var url;
    if (urlListe) {
        url = urlListe + "?";
        if (queryString)url += queryString; else {
            var url2 = document.location.href;
            if (url2.match("\\?"))url2 = url2.split("?")[1];
            if (url2.match("#"))url2 = url2.split("#")[0];
            url += url2;
        }
    } else url = document.location.href;
    url = url.replace(document.location.hash, "");
    if (lstCgis) {
        var hash = "";
        if (lstCgis.match("#")) {
            hash = lstCgis.split("#")[1];
            lstCgis = lstCgis.split("#")[0];
        }
        lstCgis.split("&").each(function (cgis) {
            var cgi = cgis.split("=")[0];
            var val = cgis.split("=")[1];
            url = getUrlWithLstParam(url, cgi, val);
        });
        if (hash.length > 0)url += "#" + hash;
    }
    return url;
}
function getUrlWithLstParam(urlBase, cgi, valeur) {
    cgi = cgi.toLowerCase();
    valeur = valeur.toLowerCase();
    urlBase = String(urlBase);
    var reg_exp = RegExp("page=[0-9]+", "gi");
    urlBase = urlBase.replace(reg_exp, "");
    var reg_exp = RegExp("&&", "gi");
    urlBase = urlBase.replace(reg_exp, "&");
    if (urlBase.match(cgi + "=")) {
        var forcerTest = false;
        if (valeur == 'g') {
            var positionCharAtester = urlBase.indexOf(cgi + "=" + valeur) + cgi.length + 1 + 1;
            if (urlBase[positionCharAtester] == 'v') {
                forcerTest = true;
            }
        }
        if (!urlBase.match(cgi + "=" + valeur) || forcerTest) {
            if (urlBase.match(cgi + "=.*?&")) {
                var reg_exp = RegExp(cgi + "=.*?&", "gi");
                urlBase = urlBase.replace(reg_exp, cgi + "=" + valeur + "&");
            }
            if (urlBase.match(cgi + "=[^&]*")) {
                var reg_exp = RegExp(cgi + "=[^&]*", "gi");
                urlBase = urlBase.replace(reg_exp, cgi + "=" + valeur);
            }
        }
    } else {
        if (!urlBase.match("\\?"))urlBase += "?"; else urlBase += "&";
        urlBase += cgi + "=" + valeur;
    }
    return urlBase;
}
function ajouterClassePanier(numHeb) {
    if (numHeb) {
        if (jQuery('.li_elemListe[data-numheber="' + numHeb + '"]').length > 0) {
            jQuery('.li_elemListe[data-numheber="' + numHeb + '"]').addClass('li_elemListe_dansPanier');
        }
        if (jQuery('.a_ajoutPanier[data-numheber="' + numHeb + '"]').length > 0) {
            jQuery('.a_ajoutPanier[data-numheber="' + numHeb + '"]').addClass('a_dansPanier');
        }
        if (jQuery('.a_retirePanier[data-numheber="' + numHeb + '"]').length > 0) {
            jQuery('.a_retirePanier[data-numheber="' + numHeb + '"]').addClass('a_dansPanier');
        }
    }
}
function supprimerClassePanier(numHeb) {
    if (numHeb) {
        if (jQuery('.li_elemListe[data-numheber="' + numHeb + '"]').length > 0) {
            jQuery('.li_elemListe[data-numheber="' + numHeb + '"]').removeClass('li_elemListe_dansPanier');
        }
        if (jQuery('.a_ajoutPanier[data-numheber="' + numHeb + '"]').length > 0) {
            jQuery('.a_ajoutPanier[data-numheber="' + numHeb + '"]').removeClass('a_dansPanier');
        }
        if (jQuery('.a_retirePanier[data-numheber="' + numHeb + '"]').length > 0) {
            jQuery('.a_retirePanier[data-numheber="' + numHeb + '"]').removeClass('a_dansPanier');
        }
    }
}
function suppSelectionPanier(ident, nothide) {
    var adr = "/lib_2/ajax/gerePanier.php";
    var sending = "action=supprPanier&ident=" + ident;
    appelAjaxXMLToFunc(adr, sending, function (response) {
        if (response) {
            var identToHide = jQuery(response).find('ident').text();
            var ul = jQuery('#ul_lst > li').get();
            var divToHide;
            jQuery(ul).each(function () {
                var attr;
                for (i = 0; i < jQuery('a', this).length; i++) {
                    attr = jQuery(jQuery('a', this)[i]).attr('data-ident');
                    if (attr != undefined) {
                        break;
                    }
                }
                if (attr == identToHide) {
                    divToHide = this;
                }
            });
            if (!nothide || nothide == undefined) {
                var tabDivs = jQuery(response).find('divToChange');
                for (i = 0; i < tabDivs.length; i++) {
                    jQuery('#' + jQuery(tabDivs[i]).find('name').text()).html(jQuery(tabDivs[i]).find('content').text());
                }
                jQuery(divToHide).hide('slow');
            }
            if (jQuery("#a_fiche_envoi_ami") && jQuery("#a_fiche_envoi_ami").attr("onclick")) {
                var onclick = jQuery("#a_fiche_envoi_ami").attr("onclick");
                onclick = onclick.replace(identToHide, "");
                onclick = onclick.replace("%2C%2C", "%2C");
                jQuery("#a_fiche_envoi_ami").attr("onclick", onclick);
            }
        }
    });
    var numHeb = '';
    var tabIdent = ident.split('.');
    numHeb = tabIdent[2];
    supprimerClassePanier(numHeb)
}
function trackMe(ident, idpage, nouvelleVersion) {
    var adr = "/lib_2/ajax/gereTracker.php";
    var sending = getInfoSession() + "&ident=" + ident + "&idpage=" + idpage + "&nouvelleVersion=" + nouvelleVersion
    jQuery.ajax({type: "POST", url: adr, data: sending});
}
function executeGAFNGF(params) {
    var month;
    (function ($) {
        var objParamStringified = $('#inputParamsGAFNGF', $('#form_envoiMailProp')).val();
        var listeParams = eval('(' + objParamStringified + ')');
        var tabPartiesDateDeb = params.dateDeb.split("/");
        var tabPartiesDateFin = params.dateFin.split("/");
        var objDateDeb = new Date(tabPartiesDateDeb[2], tabPartiesDateDeb[1], tabPartiesDateDeb[0]);
        month = new String(objDateDeb.getMonth());
        if (month.length == 1)month = "0" + month;
        listeParams.dateDeb = objDateDeb.getFullYear() + "-" + month + "-" + objDateDeb.getDate();
        var objDateFin = new Date(tabPartiesDateFin[2], tabPartiesDateFin[1], tabPartiesDateFin[0]);
        month = new String(objDateFin.getMonth());
        if (month.length == 1)month = "0" + month;
        listeParams.dateFin = objDateFin.getFullYear() + "-" + month + "-" + objDateFin.getDate();
        var nbj2 = objDateDeb.getTime() / 86400000;
        var nbj1 = objDateFin.getTime() / 86400000;
        var nbj = Math.round(nbj1 - nbj2);
        nbj = Math.abs(nbj);
        listeParams.quantite = nbj.toString();
        listeParams.semaine = objDateDeb.getFullYear() + "-" + getNumSemaine(objDateDeb.getFullYear(), objDateDeb.getMonth(), objDateDeb.getDate());
        listeParams.nbParticipant = params.nbParticipant;
        _gaq = _gaq || [];
        _gaq.push(['wa._setAccount', listeParams.ID]);
        _gaq.push(['wa._setCustomVar', 1, 'Code_postal', listeParams.CP]);
        _gaq.push(['wa._setCustomVar', 2, 'Nb_adultes', listeParams.nbParticipant]);
        _gaq.push(['wa._setCustomVar', 3, 'date_debut', listeParams.dateDeb]);
        _gaq.push(['wa._setCustomVar', 4, 'numero_semaine', listeParams.semaine]);
        _gaq.push(['wa._setCustomVar', 5, 'type_resa', listeParams.typeResa]);
        _gaq.push(['wa._addTrans', listeParams.numResa, listeParams.affiliation, listeParams.prixTotal, listeParams.fraisDossier, listeParams.assurance, listeParams.CP, listeParams.dpt, 'FRANCE']);
        _gaq.push(['wa._addItem', listeParams.numResa, listeParams.dpt + '_' + listeParams.codeProd, listeParams.nomProd, listeParams.categProd, listeParams.prixLoc, listeParams.quantite]);
        _gaq.push(['wa._trackTrans']);
        if ($("script[src$='google-analytics.com/ga.js']").length == 0) {
            (function () {
                var ga = document.createElement('script');
                ga.type = 'text/javascript';
                ga.async = true;
                ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(ga, s);
            })();
        }
    })(jQuery);
}
function executeGTM_criteo() {
    (function ($) {
        var tabParamsGTM_criteo = $('#inputParamsGTM_criteo').val();
        var listeParams = eval('(' + tabParamsGTM_criteo + ')');
        if (typeof(dataLayer) != 'undefined') {
            dataLayer.push({
                'Transaction_Id': listeParams.Transaction_Id,
                'Product_Id': listeParams.Product_Id,
                'Price': listeParams.prix,
                'event': 'Criteo_Contact'
            });
        }
    })(jQuery);
}
function addEventGa(category, action) {
    (function ($) {
        var typeGa = $("#bodyPage").attr("data-ga-type");
        if (typeGa == '') {
            return;
        }
        if (typeGa == "UA") {
            ga('send', 'event', category, action);
        }
        else {
            var _gaq = _gaq || [];
            _gaq.push(['_trackEvent', category, action]);
        }
    })(jQuery);
}
function transformChmpFormToSpan(obj) {
    var childs = obj.childNodes;
    for (var i = 0; i < childs.length; i++) {
        var child = childs[i];
        var id;
        if ((child.tagName == "INPUT" && child.type == "text") || (child.tagName == "TEXTAREA")) {
            var valeur = "";
            if (child.tagName == "TEXTAREA") {
                var idObj = child.id;
                valeur = $(idObj).value;
                if (!valeur)valeur = child.innerHTML;
                if (!valeur)valeur = child.value;
            } else valeur = child.value;
            var newElem = document.createElement("SPAN");
            newElem.innerHTML = "<strong>" + valeur + "</strong>";
            obj.replaceChild(newElem, child);
        }
        if (child.tagName == "INPUT" && (child.type == "checkbox" || child.type == "radio")) {
            if (child.checked || $(child).checked || (child.id && $(child.id).checked))child.setAttribute("checked", "checked");
        }
        if (child.tagName == "SELECT") {
            if (child.id) {
                var newElem = document.createElement("SPAN");
                newElem.innerHTML = "<strong>" + $(child.id).options[$(child.id).selectedIndex].value + "</strong>";
                obj.replaceChild(newElem, child);
            } else obj.removeChild(child);
        }
        if (child.childNodes.length > 0)child = transformChmpFormToSpan(child)
    }
    return obj;
}
function getTabChmpForm(obj) {
    var childs = obj.childNodes;
    var tabOut = new Array();
    var tabFils = new Array();
    for (var i = 0; i < childs.length; i++) {
        var child = childs[i];
        if ((child.tagName == "INPUT" && child.type == "text") || (child.tagName == "INPUT" && child.type == "checkbox") || (child.tagName == "INPUT" && child.type == "email") || (child.tagName == "INPUT" && child.type == "tel") || (child.tagName == "INPUT" && child.type == "date") || (child.tagName == "TEXTAREA") || (child.tagName == "SELECT")) {
            tabOut.push(child);
        }
        if (child.childNodes.length > 0) {
            tabFils.merge(getTabChmpForm(child));
        }
    }
    if (tabFils.length > 0)tabOut.merge(tabFils);
    return tabOut;
}
function supprDomElem(obj) {
    if (obj) {
        var parent = obj.parentNode;
        if (parent) {
            parent.removeChild(obj);
            return true;
        } else return false;
    } else return false;
}
function dupliqueDomElemversHautByObj(obj) {
    if (obj) {
        var parent = obj.parentNode;
        if (parent) {
            var newObj = obj.cloneNode(true);
            parent.insertBefore(newObj, obj);
            newObj = modifIdForObj(newObj);
            return newObj;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
function dupliqueDomElemversBasByObj(obj) {
    if (obj) {
        var parent = obj.parentNode;
        if (parent) {
            var newObj = obj.cloneNode(true);
            parent.insertBefore(newObj, obj.nextSibling);
            newObj = modifIdForObj(newObj);
            return newObj;
        } else return false;
    } else return false;
}
function setIdUniqueToObj(obj) {
    if (obj && !obj.id) {
        var str = new String();
        if (obj.getAttribute && obj.getAttribute("class") != "undefined")str = new String(obj.getAttribute("class"));
        if (str.length == 0 && obj.tagName && obj.tagName != "undefined")str = new String(obj.tagName).toLower();
        if (str.length == 0)str = new String("obj");
        obj.id = str + "-" + getUniqueId(5);
    }
}
function modifIdForObj(obj) {
    if (!obj)return null; else {
        if (obj.id) {
            var def = false;
            var idCurr = new String(obj.id);
            var re = new RegExp(".*-[0-9]+");
            if (re.test(idCurr)) {
                var tabChps = idCurr.split("-")
                tabChps.pop();
                idCurr = tabChps.join("-");
            }
            for (var j = 1; j < 500 && !def; j++) {
                var newId = idCurr + "-" + j;
                var obj2 = document.getElementById(newId);
                if (!obj2) {
                    def = true;
                    obj.id = newId;
                }
            }
        } else setIdUniqueToObj(obj);
        var childs = obj.childNodes;
        if (childs && childs.length) {
            for (var i = 0; i < childs.length; i++) {
                var child = childs[i];
                if (child)child = modifIdForObj(child);
            }
        }
        return obj;
    }
}
Array.prototype.in_array = function (p_val) {
    for (var i = 0, l = this.length; i < l; i++) {
        if (this[i] == p_val) {
            return true;
        }
    }
    return false;
}
Array.prototype.deleteItem = function (p_val) {
    for (var i = 0, l = this.length; i < l; i++) {
        if (this[i] == p_val) {
            this[i] = "";
            return true;
        }
    }
    return false;
}
Array.prototype.merge = function (tabAConcat) {
    for (var i = 0; i < tabAConcat.length; i++) {
        this.push(tabAConcat[i]);
    }
    return true;
}
String.prototype.getTabChInCaract = function (caract) {
    var idx_deb = -1, idx_fin = -1;
    var tab = new Array();
    for (var i = 0; i < this.length; i++) {
        if (this[i] == caract) {
            if (idx_deb < 0)idx_deb = i + 1; else {
                idx_fin = i;
                var ch = this.substring(idx_deb, idx_fin);
                tab.push(ch);
                idx_deb = -1;
                idx_fin = -1;
            }
        }
    }
    return tab;
}
String.prototype.remplaceStr = function (chaine_a_remplacer, chaine_remplacement) {
    var idx_deb = -1, idx_fin = -1;
    idx_deb = this.indexOf(chaine_a_remplacer);
    var ch_deb = this.substring(0, idx_deb);
    var ch_fin = this.substring((idx_deb + chaine_a_remplacer.length), this.length);
    var ch = ch_deb + chaine_remplacement + ch_fin;
    return new String(ch);
}
String.prototype.stripTags = function () {
    return this.replace(/<\/?[^>]+>/gi, '');
}
String.prototype.yaTags = function () {
    var er = /<\/?[^>]+>/gi;
    return er.test(this);
}
function getTextSelectInDocument() {
    var txt;
    if (window.getSelection) {
        txt = window.getSelection().toString();
    }
    else if (document.getSelection) {
        txt = document.getSelection();
    }
    else if (document.selection) {
        txt = document.selection.createRange().text;
    }
    return txt;
}
function initCptClient() {
    (function ($) {
        initFormsCptClient();
        if ($('#form_modifCoordCli').length) {
            initFormCoordonneesClient();
        }
        if ($('#form_chg_mdp').length) {
            initFormModifPass();
        }
        init_champsConnexion();
        init_paiement_paybox();
        initModifsResa();
        initEffectsCptClient();
    })(jQuery);
}
function initFormsCptClient() {
    (function ($) {
        $('#a_submit_recup_email').click(function (event) {
            event.preventDefault();
            var vars = $('#form_recup_email').serialize();
            var url = './lib_2/ajax/gereCptClient.php';
            $.ajax({
                url: url, data: vars, success: function (data) {
                    displayValidationSendPassword(data);
                }
            });
        });
    })(jQuery);
}
function displayValidationSendPassword(response) {
    (function ($) {
        response = '<p>' + response + '</p>';
        getNewDivToBody('divGraph_affDialog', 'dialogJquery');
        $("#divGraph_affDialog").dialog({
            buttons: {
                "OK": function () {
                    $(this).dialog("close");
                }
            }, modal: true
        }).html(response);
    })(jQuery);
}
function log_client(reponse) {
    (function ($) {
        if (reponse == '1') {
            var loc = $('#a_login_cpt_client').attr('data-href');
            $(location).attr('href', loc);
        }
        else {
            $('#p_ident_error').show("0.3");
        }
    })(jQuery);
}
function initFormCoordonneesClient() {
    (function ($) {
        $('#form_modifCoordCli').validationEngine({
            promptPosition: "topLeft",
            scroll: true,
            ajaxFormValidation: true,
            onAjaxFormComplete: refreshAccountWithXMLAndHtml,
            ajaxFormValidationURL: './lib_2/ajax/gereCptClient.php',
            dataTypeAjaxFormResponse: 'xml'
        });
        $('#a_comfirm_saisie_coord').click(function (event) {
            event.preventDefault();
            $('#form_modifCoordCli').submit();
        });
    })(jQuery);
}
function initFormModifPass() {
    (function ($) {
        var tabAValider = [];
        var mdp = new LiveValidation("newPass_input", {validMessage: $("#inpt_msgOk").val()});
        mdp.add(Validate.Format, {
            pattern: /^[0-9a-zA-Z-_]+$/,
            failureMessage: $("#inpt_msgSeulementChiffresLettres").val()
        });
        mdp.add(Validate.Length, {minimum: 4, tooShortMessage: $("#inpt_msgNbCar").val()});
        mdp.add(Validate.Presence, {failureMessage: $("#inpt_msgVide").val()});
        tabAValider.push(mdp);
        var mdpConfirm = new LiveValidation("newPassConfirm_input", {validMessage: $("#inpt_msgOk").val()});
        mdpConfirm.add(Validate.Confirmation, {match: "newPass_input", failureMessage: $("#inpt_msgCorresMdp").val()});
        tabAValider.push(mdpConfirm);
        $('#a_valid_enreg_pass').click(function (event) {
            $('#div_msgErreursInfosClient,#div_msgValideInfosClient').html('').hide('fast');
            event.preventDefault();
            $.ajax({
                url: './lib_2/ajax/gereCptClient.php',
                data: 'action=CHECKCLIENTPASS&oldPass=' + $('#oldPass_input').val(),
                success: function (reponse) {
                    if (reponse == '1') {
                        if (LiveValidation.massValidate(tabAValider)) {
                            $('#form_chg_mdp').submit();
                        }
                    }
                    else {
                        $('#div_msgErreursInfosClient').html('<p>' + reponse + '</p>').show('fast');
                    }
                }
            });
        });
    })(jQuery);
}
function init_champsConnexion() {
    (function ($) {
        if ($("#div_ligneIdentCptClient_Email #input_email").length) {
            $("#div_ligneIdentCptClient_Email #input_email").live("focus", function () {
                if ($(this).val() == $(this).attr("data-defaut"))$(this).val("");
            });
            $("#div_ligneIdentCptClient_Email #input_email").live("blur", function () {
                if ($(this).val() == "")$(this).val($(this).attr("data-defaut"));
            });
            $("#div_ligneIdentCptClient_Password #input_motPasse").live("focus", function () {
                if ($(this).val() == $(this).attr("data-defaut"))$(this).val("");
            });
            $("#div_ligneIdentCptClient_Password #input_motPasse").live("blur", function () {
                if ($(this).val() == "")$(this).val($(this).attr("data-defaut"));
            });
        }
    })(jQuery);
}
function init_paiement_paybox() {
    (function ($) {
        $('#a_boutonValiderCptClientPbx').click(function () {
            setFormPaiementCptCliPaybox();
        });
        initPaiementVersementCompteClient();
    })(jQuery);
}
function refreshAccount(response) {
    (function ($) {
        var message = response.getElementsByTagName('MESSAGE')[0].textContent;
        if (message) {
            message = '<p>' + message + '</p>';
        }
        var valid = response.getElementsByTagName('VALIDATION')[0].textContent;
        getNewDivToBody('divGraph_affDialog', 'dialogJquery');
        $("#divGraph_affDialog").dialog({
            buttons: {
                "OK": function () {
                    $(this).dialog("close");
                }
            }, modal: true, close: function () {
                if (valid == '1') {
                    refreshPage();
                }
            }
        }).html(message);
    })(jQuery);
}
function refreshAccountWithXMLAndHtml(form, response) {
    (function ($) {
        var message = response.getElementsByTagName('MESSAGE')[0].textContent;
        if (message) {
            message = '<p>' + message + '</p>';
        }
        var valid = response.getElementsByTagName('VALIDATION')[0].textContent;
        getNewDivToBody('divGraph_affDialog', 'dialogJquery');
        $("#divGraph_affDialog").dialog({
            buttons: {
                "OK": function () {
                    $(this).dialog("close");
                }
            }, modal: true, close: function () {
                if (valid == '1') {
                    redirectAccueil();
                }
            }
        }).html(message);
    })(jQuery);
}
function refreshPage() {
    window.location.reload();
}
function redirectAccueil() {
    document.location.href = '?';
}
function initEffectsCptClient() {
    (function ($) {
        $('.div_to_bounce').each(function () {
            if ($(this).attr('show') == '1') {
                $(this).show('bounce', {distance: 40}, 500);
            }
        });
    })(jQuery);
}
function initModifsResa() {
    (function ($) {
        $('input[name="inputTypeClientAssurance"]').each(function () {
            if ($(this).is(':checked')) {
                $('.divFormuleAssurance').hide();
                $('.divFormuleAssuranceType' + $(this).val()).show();
            }
        });
        $('#a_valid_modif_assurance').click(function (event) {
            event.preventDefault();
            var vars = $('#frmChgtAssurance').serialize();
            var url = './lib_2/ajax/gereCptClient.php';
            $.ajax({
                url: url, data: vars, success: function (data) {
                    refreshAccount(data);
                }
            });
        });
        $('#a_modif_nb_pers').click(function (event) {
            event.preventDefault();
            var vars = $('#frmChgtNbPers').serialize();
            var url = './lib_2/ajax/gereCptClient.php';
            $.ajax({
                url: url, data: vars, success: function (data) {
                    refreshAccount(data);
                }
            });
        });
        $('.inpt_choixFormuleAssurance').change(function () {
            affMsgAttenteParDessusInDiv('frmChgtAssurance');
            $.ajax({
                type: 'POST',
                url: '/lib_2/ajax/gereCptClient.php',
                data: $('#frmChgtAssurance').serialize(),
                success: function (data) {
                    refreshPage();
                }
            });
        });
        $('input[name="inputTypeClientAssurance"]').click(function () {
            $('.divFormuleAssurance').hide();
            $('.divFormuleAssuranceType' + $(this).val()).show();
        });
    })(jQuery)
}
function initCompteClientV5surV4() {
    (function ($) {
        if ($('#compteClientV5surV4').length > 0) {
            $('head').append('<link rel="stylesheet" media="screen" href="../config_v3/css_defaut/v5/commun/defaut/compte_client.css" type="text/css" />');
            $('head').append('<link rel="stylesheet" media="screen" href="../config_v3/css_defaut/v5/admin/jquery/jquery-ui.css" type="text/css" />');
            $('head').append('<link rel="stylesheet" media="screen" href="../config_v3/css_defaut/v5/admin/jquery/validationEngine.jquery.css" type="text/css" />');
            $('#compteClientV5surV4').slideDown('fast');
            initCptClient();
            var tab = $('img,input', $('#compteClientV5surV4'));
            $('img,input', $('#compteClientV5surV4')).each(function () {
                var src = $(this).attr('src') || '';
                if (src.match(/^\/imgs_defaut/)) {
                    $(this).attr('src', '/config_v3/' + $(this).attr('src'));
                }
            });
            if ($('.div_itea_GMAP', $('#compteClientV5surV4')).length > 0) {
                loadScriptGoogleMap();
                window.setTimeout(function () {
                    chargeGMap();
                }, 2000);
            }
        }
    })(jQuery)
}
function recupParamSiteModeOuverturePaybox() {
    if (jQuery('#form_formPbx').length) {
        return jQuery('#form_formPbx').attr('ouverture_paybox');
    }
}
function pbxInPopUp() {
    return (recupParamSiteModeOuverturePaybox() == "POPUP");
}
function refreshFormPbx(site, rang, identifiant, reference) {
    (function ($) {
        $("#inpt_pbx_site").val(site);
        $("#inpt_pbx_rang").val(rang);
        $("#inpt_pbx_identifiant").val(identifiant);
        $("#inpt_pbx_cmd").val(reference);
        if (pbxInPopUp()) {
            $("#form_formPbx").attr('target', "popup_paybox");
        }
        $("#form_formPbx").submit();
    })(jQuery);
}
function setFormPaiementCptCliPaybox() {
    (function ($) {
        var montant_a_payer;
        if ($("#div_validFormPbx").length)$("#div_validFormPbx").hide();
        if ($("#input_paiement_cbVersPbx").length && $("#input_paiement_cbSoldePbx").length) {
            if ($("#input_paiement_cbSoldePbx:checked").length) {
                montant_a_payer = $("#inpt_solde_cptCliPbx").val();
            }
            else {
                if (verifMontantVersement()) {
                    montant_a_payer = parseFloat($("#inpt_vers_cptClient").val()) * 100;
                }
                else {
                    alertAMalibu('Le montant saisi est incorrect.');
                    return false;
                }
            }
        }
        else if ($("#input_paiement_cbAcomptePbx").length && $("#input_paiement_cbSoldePbx").length) {
            if ($("#input_paiement_cbAcomptePbx:checked").length) {
                var quelPaiement = 'acompte';
                montant_a_payer = $("#inpt_acompte_cptCliPbx").val();
            }
            else {
                if ($("#input_paiement_cbSoldePbx:checked").length) {
                    var quelPaiement = 'solde';
                    montant_a_payer = $("#inpt_solde_cptCliPbx").val();
                }
            }
        }
        else {
            var quelPaiement = 'solde';
            montant_a_payer = $("#inpt_solde_cptCliPbx").val();
        }
        $("#inpt_pbx_montant").val(montant_a_payer);
        var montant_a_payer_for_trw = montant_a_payer / 100;
        var adr = "/lib_2/ajax/infosDist.php";
        var exe = $("#form_formPbx").attr("exercice");
        var type_resa = $("#form_formPbx").attr("type_resa");
        var nom_instance = $("#form_formPbx").attr("nom_instance");
        var base = $("#form_formPbx").attr("base");
        var numero_resa = $("#form_formPbx").attr("numero_resa");
        var idsession = 'PHPSESSID=' + $("#form_formPbx").attr("idsession");
        var dpt = $("#form_formPbx").attr("dpt");
        var sending = "info=REGLTCPTCLIPBX&numero_resa=" + numero_resa + "&exercice=" + exe + "&type_resa=" + type_resa + "&nom_instance=" + nom_instance + "&base=" + base + "&montant_a_payer=" + montant_a_payer_for_trw + "&dpt=" + dpt + "&" + idsession + "&quelPaiement=" + quelPaiement;
        appelAjaxToFunc(adr, sending, function (retour) {
            eval("var tabRetour=" + retour);
            if (tabRetour.code == "OK") {
                var autorisationSeule = tabRetour.autoSeule || false;
                if (autorisationSeule) {
                    $("#form_formPbx").append('<input type="hidden" name="PBX_AUTOSEULE" id="inputPBX_AUTOSEULE" value="O"/>');
                }
                if (tabRetour.MONTANTACTUALISE != undefined && tabRetour.MONTANTACTUALISE > 0) {
                    $("#inpt_pbx_montant").val(tabRetour.MONTANTACTUALISE);
                }
                refreshFormPbx(tabRetour.SITE, tabRetour.RANG, tabRetour.IDENTIFIANT, tabRetour.REFERENCE);
            } else {
                location.reload();
            }
        });
    })(jQuery);
}
var lang = "";
var onEstSurUnSiteAnglaisEtFautMettreLeSigneEuroDevantLeMontant;
var urlAJAX = "/lib_2/ajax/gereResa.php?";
var idSession;
var errDossierNull = "dossierNull";
var chainePlanning = "";
var dateDebPlanning = "";
var infoBulles = "";
var nbJours = "";
var objDateDeb;
var objDateFin;
var nbMois;
var txtAttente = "<p id='p_msgAttente'><img id='img_roueAttente' style='margin:auto' src=/config_v3/imgs_defaut/loading/ajax-loader2.gif /></p>";
var txtVerifDispos = "<p id='p_msgAttente'><img id='img_roueAttente' style='margin:auto' src=/config_v3/imgs_defaut/loading/loader.gif /></p>";
var txtErreurPrix = '<p id="p_msgErreur">Une erreur est survenue lors du calcul du prix de votre réservation. Si le problème persiste, contactez la centrale de réservation.</p>';
var gestprod = false;
var rafraichirSurUrlActuelleApresSelectDateFin = false;
var modeCalculPrixSurFiche = false;
var afficheRecapPrix;
var defaultDateDebut = null;
function initLangue() {
    (function ($) {
        lang = $("body").attr("data-langue");
        if (lang == "ANGLAIS")
            lang = "en-GB"; else if (lang == "HOLLANDAIS")
            lang = "nl"; else if (lang == "ALLEMAND")
            lang = "de"; else
            lang = "fr";
        if (lang == "en-GB")
            onEstSurUnSiteAnglaisEtFautMettreLeSigneEuroDevantLeMontant = true; else
            onEstSurUnSiteAnglaisEtFautMettreLeSigneEuroDevantLeMontant = false;
    })(jQuery);
}
function getIdSessionInHtml() {
    var idSess;
    (function ($) {
        idSess = $("body").attr("data-iditea");
        if (!idSess) {
            idSess = $('.data-iditea').attr('id');
        }
        if (urlAJAX.indexOf("PHPSESSID") == -1) {
            urlAJAX += 'PHPSESSID=' + idSess;
        }
    })(jQuery);
    return 'PHPSESSID=' + idSess;
}
function recupParamsUrl() {
    var params = location.search.substring(1).split('&');
    var retour = [];
    for (var i = 0; i < params.length; i++) {
        var param = params[i].split('=');
        retour[param[0]] = param[1];
    }
    return retour;
}
function getInstanceInUrl() {
    var params = recupParamsUrl();
    if (!params.ident)
        return "";
    var tabIdent = params.ident.split(".");
    var tabInstance = tabIdent[0].split("_");
    return tabInstance[0];
}
function getNumHeberInUrl() {
    var params = recupParamsUrl();
    if (!params.ident)
        return "";
    var tabIdent = params.ident.split(".");
    return tabIdent[2];
}
function retourEtape1(msg) {
    alertAMalibu(msg);
    setTimeout(function () {
        var pos = location.search.length;
        var tmp = "?";
        if (location.search.indexOf("PHPSESSID") > -1) {
            pos = location.search.indexOf("PHPSESSID");
            pos--;
            tmp = location.search.substr(0, pos);
        } else {
            tmp = location.search;
        }
        location.href = "/resa/etape1.php" + tmp + "&FINSESSION=1";
    }, 3000);
}
function initBtnsFooter() {
    (function ($) {
        if (navigator.appVersion.indexOf("Chrome") > -1) {
            $(".a_btnFooter[href$='.pdf']").fancybox({
                type: 'iframe',
                titleShow: false,
                autoScale: false,
                width: "90%",
                height: "90%"
            });
            if ($("#a_valideCGV").length > 0) {
                $("#a_valideCGV[href$='.pdf']").fancybox({
                    type: "iframe",
                    titleShow: false,
                    autoScale: false,
                    width: "90%",
                    height: "90%"
                });
            }
        }
        $(".a_btnFooter[href^='#div']").fancybox({fitToView: false, maxWidth: "800", maxHeight: "600"});
    })(jQuery);
}
function initEtape1() {
    (function ($) {
        $.ajaxSetup({timeout: 100000});
        initLangue();
        idSession = getIdSessionInHtml();
        nbMois = $("#inpt_nbMoisCalend").val();
        if (!nbMois) {
            nbMois = 2;
        }
        initBtnsFooter();
        $.datepicker.setDefaults($.datepicker.regional[lang]);
        $(".div_uneEtapeRecap:hidden:first").parent().addClass('div_uneEtapeCurr');
        afficherMasquerCalendrier();
        if ($("#div_uneEtape_compoFamilleGite").length > 0) {
            setEventsForGite();
        } else if ($("#div_uneEtape_compoFamilleChambre").length > 0) {
            setEventsForChambre();
        }
        $(".div_uneEtapeGrisee *").attr("disabled", true);
        if ($('#div_uneEtape_selectionOrigine').length > 0) {
            $('input[name="radio_selectionOrigine"]').change(function () {
                var origine = $('input[name="radio_selectionOrigine"]:checked').val();
                $.ajax({type: 'POST', url: urlAJAX, data: {type: 'setTypeDossier_resaBureau', origine: origine}});
            });
        }
        $('body').delegate('.select_compoAnimaux', 'change', function () {
            var prefixId = $(this).attr('data-num');
            var nbMax = $("#inpt_nbAnimauxMax" + prefixId).val();
            var nbMaxReel;
            try {
                nbMaxReel = parseInt($(this).attr('data-nbAnimaux'));
            }
            catch (e) {
                nbMaxReel = nbMax;
            }
            affectAnimaux(prefixId);
            if ($(".option.animal").length > 0) {
                afficheEffaceOptions("Animaux");
            }
            else {
                $("#div_recapOptionsAnimaux").hide();
                etapeCourante($("#div_uneEtapeAnimaux"), true);
            }
            if ($("#select_compoAnimauxChien" + prefixId).val() == 0 && $("#select_compoAnimauxChat" + prefixId).val() == 0)
                $("#div_recapOptionsAnimaux").hide();
            $("#div_uneEtapeAnimaux").find(".inpt_validEtape").val("Oui");
            var nbSelect = $(this).val();
            nbSelect = nbMax - nbSelect;
            var i = 1;
            while (i <= nbSelect && i > 0) {
                if ($(this).is($("#select_compoAnimauxChien" + prefixId))) {
                    if ($("#select_compoAnimauxChat" + prefixId).children("[value='" + i + "']").length == 0) {
                        $("#select_compoAnimauxChat" + prefixId).append("<option value='" + i + "'>" + i + "</option>");
                    }
                }
                else {
                    if ($("#select_compoAnimauxChien" + prefixId).children("[value='" + i + "']").length == 0) {
                        $("#select_compoAnimauxChien" + prefixId).append("<option value='" + i + "'>" + i + "</option>");
                    }
                }
                i++;
            }
            for (i = nbMax; i > nbSelect; i--) {
                if ($(this).is($("#select_compoAnimauxChien" + prefixId))) {
                    $("#select_compoAnimauxChat" + prefixId).children("[value='" + i + "']").remove();
                }
                else {
                    $("#select_compoAnimauxChien" + prefixId).children("[value='" + i + "']").remove();
                }
            }
            if (prefixId > 0) {
                var numOption = $(this).closest('tr.optionChambre').attr('numoption');
                var valFinale = parseInt($("#select_compoAnimauxChat" + prefixId).val()) + parseInt($("#select_compoAnimauxChien" + prefixId).val());
                afficheEffaceOptionsSupplementaireObligatoires(numOption, prefixId, valFinale);
            }
            if ((nbMaxReel != parseInt(nbMax)) && nbMaxReel >= 0) {
                var valSelected = parseInt($(this).val());
                if ($(this).is($("#select_compoAnimauxChien" + prefixId))) {
                    $('option', "#select_compoAnimauxChat" + prefixId).each(function () {
                        if ((parseInt($(this).val()) + valSelected) > nbMaxReel) {
                            $(this).addClass('surcapacite');
                        }
                        else {
                            $(this).removeClass('surcapacite');
                        }
                    });
                }
                if ($(this).is($("#select_compoAnimauxChat" + prefixId))) {
                    $('option', "#select_compoAnimauxChien" + prefixId).each(function () {
                        if ((parseInt($(this).val()) + valSelected) > nbMaxReel) {
                            $(this).addClass('surcapacite');
                        }
                        else {
                            $(this).removeClass('surcapacite');
                        }
                    });
                }
                var nbChats = parseInt($("#select_compoAnimauxChat" + prefixId).val());
                var nbChiens = parseInt($("#select_compoAnimauxChien" + prefixId).val());
                var divMessage;
                if (prefixId) {
                    divMessage = $(this).parents('.div_uneEtapeAnimaux').find('.messageSurcapaciteAnimaux');
                }
                else {
                    divMessage = $('.messageSurcapaciteAnimaux', '#div_uneEtapeAnimaux');
                }
                if (nbMaxReel < (nbChiens + nbChats)) {
                    $(divMessage).show('fast');
                }
                else {
                    $(divMessage).hide();
                }
            }
        });
        if ($('#div_uneEtape_assuranceAnnul').length > 0) {
            $('#div_uneEtape_assuranceAnnul').css('display', 'none');
        }
        initAssurance();
        $('body').delegate('input:radio', 'change', function () {
            var btRadio = $(this);
            var regexAnimaux = /^animaux[0-9]*$/;
            if (regexAnimaux.test(btRadio.attr('name'))) {
                if (btRadio.val() == "Oui") {
                    btRadio.closest('.div_uneEtapeContentText').find('.div_compoAnimaux').show();
                    btRadio.closest('.div_uneEtapeContentText').find('.div_recapOptionsAnimaux').show();
                }
                else {
                    btRadio.closest('.div_uneEtapeContentText').find('.div_compoAnimaux').hide();
                    btRadio.closest('.div_uneEtapeContentText').find('.div_recapOptionsAnimaux').hide();
                    btRadio.closest('.div_uneEtapeContentText').find(".select_compoAnimaux").val(0);
                    btRadio.closest('.div_uneEtapeContentText').find(".select_compoAnimaux").trigger('change');
                    etapeCourante($("#div_uneEtapeAnimaux"), true);
                }
            }
        });
        $("#div_motMagique a").click(function () {
            if ($("#inpt_motMagique").val() != "") {
                verifMotMagique();
            }
        });
        $("#inpt_motMagique").blur(function () {
            if ($("#inpt_motMagique").val() != "") {
                verifMotMagique(true);
            }
        });
        $(".a_modifEtape").click(function () {
            $(this).siblings("h3").find(".sp_lblEtape").validationEngine("hide");
            $(this).parents(".div_uneEtape").find(".div_uneEtapeRecap").hide("slow");
            $(".div_uneEtapeCurr").removeClass('div_uneEtapeCurr');
            $(this).parents(".div_uneEtape").addClass('div_uneEtapeCurr');
            $(this).parents(".div_uneEtape").find(".div_uneEtapeContent").show("slow", function () {
                $(this).parents(".div_uneEtape").find(".div_uneEtapeContent").css("overflow", "");
            });
            $(this).hide();
        });
        if ($('#fraisDossierPV').length > 0) {
            $('#fraisDossierPV').keypress(function (event) {
                var charCode = event.which;
                if (charCode > 31 && ((charCode < 48 || charCode > 57) && charCode !== 44 && charCode !== 46)) {
                    event.preventDefault();
                }
                if (charCode > 31) {
                    var val = $(this).val() + String.fromCharCode(charCode);
                    var regex = /^(\d)*([\.,]){0,1}(\d)*$/;
                    if (!regex.test(val)) {
                        event.preventDefault();
                    }
                }
            });
            $('#buttonFraisDossierPV').click(function () {
                $.ajax({
                    type: "POST",
                    url: urlAJAX,
                    data: {type: "affecteFraisDossier", frais: $('#fraisDossierPV').val()},
                    beforeSend: function () {
                        affMsgAttenteParDessusInDiv("div_recapPrix", "recapPrix", txtAttente);
                    },
                    success: function (result) {
                        var tabRetour = XMLToArray(result);
                        if (tabRetour.code == 'OK') {
                            afficheEffaceRecapPrix(tabRetour);
                        }
                        else {
                            tabRetour.msg = tabRetour.msg || false;
                            if (tabRetour.msg) {
                                alertAJquery(tabRetour.msg);
                            }
                        }
                        $('#sp_recapFraisDossier').html(tabRetour.htmlRecapFraisDossier);
                        effaceMsgAttenteParDessus("recapPrix");
                        etapeCourante($("#div_uneEtape_fraisDossier"), true);
                    }
                });
            });
            $('#buttonAnnuleFraisDossierPV').click(function () {
                $('#fraisDossierPV').val('');
                $.ajax({
                    type: "POST",
                    url: urlAJAX,
                    data: {type: "affecteFraisDossier", frais: ''},
                    beforeSend: function () {
                        affMsgAttenteParDessusInDiv("div_recapPrix", "recapPrix", txtAttente);
                    },
                    success: function (result) {
                        var tabRetour = XMLToArray(result);
                        if (tabRetour.code == 'OK') {
                            afficheEffaceRecapPrix(tabRetour);
                        }
                        else {
                            tabRetour.msg = tabRetour.msg || false;
                            if (tabRetour.msg) {
                                alertAJquery(tabRetour.msg);
                            }
                        }
                        $('#sp_recapFraisDossier').html(tabRetour.htmlRecapFraisDossier);
                        effaceMsgAttenteParDessus("recapPrix");
                        etapeCourante($("#div_uneEtape_fraisDossier"), true);
                    }
                });
            });
        }
        $("#div_btnConfirmer > a:not(.a_btnAttenteConfirm), #div_btnConfirmer_1 > a:not(.a_btnAttenteConfirm)").click(function () {
            $(this).hide();
            $(".a_btnAttenteConfirm").show();
            if ($("#inpt_motMagique").length > 0) {
                if ($("#inpt_motMagique").val() != "") {
                    verifMotMagique();
                }
                else {
                    $("#div_motMagique > span.confirmSaisie").hide();
                }
            }
            if ($("#div_motMagique > span.confirmSaisie.ko:visible").length == 0) {
                if (etapesValid()) {
                    var paramsURL = location.search;
                    if (paramsURL.indexOf("FINSESSION") > -1)
                        paramsURL = paramsURL.replace("FINSESSION=1", "");
                    if ($(this).is('#div_btnConfirmer > a:not(.a_btnAttenteConfirm)')) {
                        var numeroEtape = '2';
                        if ($('#divNumeroProchaineEtape').attr('data-prochaineetape')) {
                            numeroEtape = $('#divNumeroProchaineEtape').attr('data-prochaineetape');
                        }
                        if (paramsURL.indexOf("PHPSESSID") > -1)
                            location.href = 'etape' + numeroEtape + '.php' + paramsURL; else
                            location.href = 'etape' + numeroEtape + '.php' + paramsURL + "&" + idSession;
                    } else {
                        $('#div_btnConfirmer_2 > a:not(.a_btnAttenteConfirm)').click();
                    }
                }
            }
            $(".a_btnAttenteConfirm").hide();
            $(this).show();
        });
        $('.inpt_modifHoraires').live('blur', function () {
            setHeuresArriveeDepart();
        });
        initModifPrixResaBureau();
    })(jQuery);
}
function afficherMasquerCalendrier(tabParam) {
    (function ($) {
        $("input:radio[name=modeResa]").change(function () {
            $("#div_calendrierDeb").hide().removeClass("open");
            $("#div_datepickerDeb").datepicker("destroy");
        });
        if ($("#div_choixModeResaGEGS").length > 0) {
            var modeResa = $("input:radio[name=modeResa]:checked").val();
        }
        var tabData = {type: "getPlanningDeb", modeResa: modeResa}
        if (tabParam) {
            tabData = {
                type: "getPlanningDeb",
                modeResa: modeResa,
                ident: tabParam.ident,
                instance: tabParam.instance,
                exercice: tabParam.exercice,
                estpresentsurfiche: true
            }
            if (!nbMois) {
                nbMois = 1
            }
            if (tabParam.modefiche) {
                rafraichirSurUrlActuelleApresSelectDateFin = true;
            }
            if (tabParam.modeFicheV8) {
                modeCalculPrixSurFiche = true;
            }
        }
        $(".sp_fermerCal").click(function () {
            $(this).parents(".div_calendDateDebFin").hide();
        });
        $("#inpt_resaDateDeb").click(function () {
            if ($("#div_choixModeResaGEGS").length > 0) {
                modeResa = $("input:radio[name=modeResa]:checked").val();
                tabData.modeResa = modeResa;
            }
            $("#div_calendrierDeb").show().addClass("open");
            $("#div_msgErreursDateDeb").hide();
            $("#div_calendrierFin").hide().removeClass("open");
            $.ajax({
                type: "POST", url: urlAJAX, async: false, data: tabData, beforeSend: function () {
                    $("#div_roueDatepickerDeb").show();
                }, success: function (result) {
                    eval("var tabDispos=" + result);
                    if (tabDispos.code == errDossierNull) {
                        retourEtape1(tabDispos.msg);
                    }
                    else if (tabDispos.errTechnq) {
                        afficheMsgErrTechnq(tabDispos.msg, tabDispos.titre, tabDispos.ident, true);
                    }
                    else if (tabDispos.code == "OK") {
                        chainePlanning = tabDispos.chaineDispo;
                        dateDebPlanning = tabDispos.dateDeb;
                        dateFinPlanning = tabDispos.dateFin;
                        infoBulles = tabDispos.infoBulle;
                        initDatePickerDeb();
                    }
                    else {
                        alertAMalibu(tabDispos.msg);
                        $("#div_calendrierDeb").hide().removeClass("open");
                        $("#div_uneEtape_date").find(".inpt_validEtape").val("Non");
                    }
                    $("#div_roueDatepickerDeb").hide();
                }
            });
            return false;
        });
        $("#inpt_resaDateFin").click(function () {
            var regDate = new RegExp("[0-9]{2}\/[0-9]{2}\/[0-9]{4}");
            $("#div_calendrierDeb").hide().removeClass("open");
            if (regDate.test($("#inpt_resaDateDeb").val())) {
                if ($('#div_datepickerFin').text() == '') {
                    if ($('#div_datepickerDeb').text() == '') {
                        $("#inpt_resaDateDeb").trigger('click')
                    }
                    setDateDeb($('#inpt_resaDateDeb').val())
                    initDatePickerFin();
                } else {
                    $("#div_calendrierFin").show().addClass("open");
                }
            }
            else {
                $("#div_msgErreursDateDeb").show();
                $("#div_calendrierDeb").show().addClass("open");
                if (tabParam && tabParam.modeFicheV8) {
                    ouvreDatePickerDateDeb_packDivDatesTarifs();
                }
            }
            return false;
        });
        initChangeJourRef();
        initChangeHeureDebFin();
    })(jQuery);
}
function initResumeEtapes() {
    (function ($) {
        $(".inpt_validEtape").each(function () {
            var classe, li, divParente, numero, titre, id;
            divParente = $(this).parents('.div_uneEtape');
            numero = $(divParente).find('.sp_numEtape').text();
            titre = $(divParente).find('.sp_lblEtape').text();
            id = $(divParente).attr('id');
            if ($(this).val() != 'Oui') {
                classe = "notValid";
            }
            else {
                classe = "valid";
            }
            li = "<li class='" + classe + "' id='resume_" + id + "'>";
            li += "<a href='#" + id + "'>" + numero + ". " + titre + "</a>";
            li += "</li>";
            if ($('#resume_' + id).length > 0) {
                $('#resume_' + id).remove();
            }
            $('#recapEtapesValidees > ol').append(li);
        });
    })(jQuery);
}
function setEventsForGite() {
    (function ($) {
        $("#div_optionsSuppl").find("tr:last").addClass("last");
        $("#div_infosOptionsObligatoiresContent").find("tr:last").addClass("last");
        $("#div_infosOptionsAnimauxContent").find("tr:last").addClass("last");
        $("#select_compoFamilleAdulte").change(function () {
            metAJourListeFamille();
            afficheEffaceOptions("Adultes");
            if ($(this).val() == 0) {
                if (estResaGP()) {
                    $("#div_infoCompoFamilleQuestionEnfants").hide();
                    $(".div_infoCompoFamilleReponseEnfants input").attr("checked", false);
                    $("#div_infoCompoFamilleEnfants, #div_compoFamilleAgeEnfants").hide();
                    $(".select_compoFamilleAgeEnfants").val(0);
                    $("#div_uneEtape_compoFamilleGite").find(".inpt_validEtape").val("Non");
                }
            }
            else {
                $("#div_infoCompoFamilleQuestionEnfants").show();
                if ($('#inpt_enfantsNon').is(':checked') || !estResaGP()) {
                    $("#div_uneEtape_compoFamilleGite").find(".inpt_validEtape").val("Oui");
                }
            }
            affectFamille();
        });
        if ($("#inpt_nbEnfants")) {
            metAJourListeFamille();
            $("#select_compoFamilleEnfant").val($("#inpt_nbEnfants").val());
        }
        $("#select_compoFamilleEnfant").change(function () {
            $(".td_ageEnfants").hide();
            if ($(this).val() != 0) {
                for (var i = 1; i <= $(this).val(); i++) {
                    $("#td_ageEnfant_" + i).show();
                }
                $("#div_compoFamilleAgeEnfants").show("slow");
                if (estResaBureauProp() || estResaBureauGestloc()) {
                    $("#div_uneEtape_compoFamilleGite").find(".inpt_validEtape").val("Oui");
                } else {
                    if ($(".select_compoFamilleAgeEnfants[value=0]:visible").length == 0) {
                        $("#div_uneEtape_compoFamilleGite").find(".inpt_validEtape").val("Oui");
                    }
                    else {
                        $("#div_uneEtape_compoFamilleGite").find(".inpt_validEtape").val("Non");
                    }
                }
            }
            else {
                $("#div_uneEtape_compoFamilleGite").find(".inpt_validEtape").val("Oui");
                $("#div_compoFamilleAgeEnfants").hide("slow");
                $(".select_compoFamilleAgeEnfants").val(0);
            }
            afficheEffaceOptions("Adultes");
            affectFamille();
        });
        $("#select_compoFamilleBebe").change(function () {
            if (estResaBureauProp() || estResaBureauGestloc()) {
                $("#div_uneEtape_compoFamilleGite").find(".inpt_validEtape").val("Oui");
            } else {
                if ($(".select_compoFamilleAgeEnfants[value=0]:visible").length == 0) {
                    $("#div_uneEtape_compoFamilleGite").find(".inpt_validEtape").val("Oui");
                }
                else {
                    $("#div_uneEtape_compoFamilleGite").find(".inpt_validEtape").val("Non");
                }
            }
            affectFamille("bebes");
        });
        $("input:radio[name=enfants]").change(function () {
            if ($(this).val() == "Oui") {
                $("#div_uneEtape_compoFamilleGite").find(".inpt_validEtape").val("Non");
                $("#div_infoCompoFamilleEnfants").show("slow");
            }
            else {
                if ($("#select_compoFamilleEnfant").val() > 0) {
                    $("#select_compoFamilleEnfant, #select_compoFamilleBebe").val(0);
                    if ($("tr.option.indiv.obligatoire:not(.animal):visible").length > 0) {
                        afficheEffaceOptions("Adultes");
                    }
                    affectFamille();
                    $("#div_infoCompoFamilleEnfants").hide("slow");
                    $("#div_compoFamilleAgeEnfants, #div_compoFamille_msgReinitEnfant").hide();
                }
                if ($(".option.obligatoire:not(.animal)").length > 0) {
                    $("#div_recapOptionsObligatoires > ul").html(getXHTML_recapOptionsObligatoires());
                    $("#div_recapOptionsObligatoires").show();
                }
                $("#div_infoCompoFamilleEnfants").hide();
                etapeCourante($("#div_uneEtape_compoFamilleGite"), true);
            }
        });
        $(".select_compoFamilleAgeEnfants").change(function () {
            if ($(".select_compoFamilleAgeEnfants[value=0]:visible").length == 0) {
                $("#div_recapOptionsObligatoires").find("ul").html(getXHTML_recapOptionsObligatoires());
                affectAgeEnfants();
                etapeCourante($("#div_uneEtape_compoFamilleGite"), true);
            }
            else {
                $("#div_uneEtape_compoFamilleGite").find(".inpt_validEtape").val("Non");
            }
        });
        if ($(".pasdeDateEnfants")) {
            $(".pasdeDateEnfants").click(function () {
                if ($(this).attr('data-ok') == '1') {
                    $(this).attr('data-ok', '0');
                    etapeCourante($("#div_uneEtape_compoFamilleGite"), false);
                } else {
                    $(this).attr('data-ok', '1');
                    etapeCourante($("#div_uneEtape_compoFamilleGite"), true);
                }
                return false;
            });
        }
        $(".select_optionAdultes, .select_optionEnfants, .select_optionAnimaux, .select_optionGroupe").change(function () {
            affectOptions();
        });
        initListesDureeOption();
    })(jQuery);
}
function setEventsForChambre() {
    (function ($) {
        if ($(".inpt_chambre:checked").length > 0)
            $("#div_uneEtape_compoFamilleChambre").find(".inpt_validEtape").val("Oui");
        $(".div_uneChambreTarifsOption").each(function () {
            $(this).find("tr:last").addClass("last");
        });
        $(".inpt_chambre").change(function () {
            var numChambre = getNumChambreByElem($(this));
            var annulChoix = false;
            if ($(this).attr('data-annulChoix')) {
                annulChoix = true;
                $(this).removeAttr('data-annulChoix');
            }
            affectChambre(numChambre, annulChoix);
            if ($(this).attr("checked") == "checked") {
                $(this).siblings("span").show();
            }
            else {
                $(this).siblings("span").hide();
                if ($("#select_compoFamilleAdulte_" + numChambre).val() > 0) {
                    $("#select_compoFamilleAdulte_" + numChambre).val(0);
                    $("#select_compoFamilleAdulte_" + numChambre).change();
                }
            }
        });
        $(".select_compoFamilleAdulte").change(function () {
            var numChambre = getNumChambreByElem($(this));
            metAJourListeFamille(numChambre);
            var divUneChambreTarifsOption = $(this).parents('.div_uneChambreContent').find('.div_uneChambreTarifsOption');
            var elemsDivUneChambreTarifsOption = divUneChambreTarifsOption.find('*');
            if ($(this).val() == 0) {
                $("#div_infoCompoFamilleQuestionEnfants_" + numChambre).hide();
                if (estResaGP()) {
                    $("#div_infoCompoFamilleEnfants_" + numChambre).hide();
                    $("#div_compoFamilleAgeEnfants_" + numChambre).hide();
                }
                $(".inpt_optionChambre_" + numChambre).attr("disabled", true);
                $(".select_optionChambre_" + numChambre).attr("disabled", true);
                $("#inpt_enfantsNon_" + numChambre).attr("checked", false);
                $("#inpt_enfantsOui_" + numChambre).attr("checked", false);
                elemsDivUneChambreTarifsOption.attr('disabled', true);
                divUneChambreTarifsOption.toggleClass('div_uneChambreTarifsOptionGrisee', true);
                if (estResaGP() || parseInt($('#select_compoFamilleEnfant_' + numChambre).val()) === 0) {
                    if ($("#inpt_chambre_" + numChambre).attr("checked") == "checked") {
                        $("#inpt_chambre_" + numChambre).attr("checked", false);
                        $("#inpt_chambre_" + numChambre).change();
                    }
                }
                if ($(".inpt_chambre:checked").length == 0)
                    $(this).parents(".div_uneEtape").find(".inpt_validEtape").val("Non");
            } else {
                if ($("#inpt_chambre_" + numChambre).attr("checked") == undefined) {
                    $("#inpt_chambre_" + numChambre).attr("checked", true);
                    $("#inpt_chambre_" + numChambre).change();
                }
                $(".inpt_optionChambre_" + numChambre).attr("disabled", false);
                $(".select_optionChambre_" + numChambre).attr("disabled", false);
                $("#div_infoCompoFamilleQuestionEnfants_" + numChambre).show();
                elemsDivUneChambreTarifsOption.attr('disabled', false);
                divUneChambreTarifsOption.toggleClass('div_uneChambreTarifsOptionGrisee', false);
                mettreAjourListeRepas(numChambre);
                etapeCourante($("#div_uneEtape_compoFamilleChambre"), true);
            }
            affectFamille("Adultes", numChambre);
        });
        $(".input_choixEnfants").change(function () {
            var numChambre = getNumChambreByElem($(this));
            if ($(this).val() == "Oui") {
                $(this).parents(".div_uneEtape").find(".inpt_validEtape").val("Non");
                $("#div_infoCompoFamilleEnfants_" + numChambre).show("slow");
                $("#div_compoFamilleAgeEnfants_" + numChambre).show("slow");
            }
            else {
                if ($("#select_compoFamilleEnfant_" + numChambre).val() > 0 || $("#select_compoFamilleBebe_" + numChambre).val() > 0) {
                    $("#select_compoFamilleEnfant_" + numChambre + ", #select_compoFamilleBebe_" + numChambre).val(0);
                    affectFamille("", numChambre);
                }
                $("#div_infoCompoFamilleEnfants_" + numChambre).hide("slow");
                $("#div_compoFamilleAgeEnfants_" + numChambre).hide("slow");
                etapeCourante($("#div_uneEtape_compoFamilleChambre"), true);
                $('.select_compoFamilleAgeEnfants_' + numChambre).val(0);
                affectAgeEnfants();
            }
        });
        if ($(".inpt_nbEnfants").length > 0) {
            $(".inpt_nbEnfants").each(function () {
                var numChambre = getNumChambreByElem($(this));
                metAJourListeFamille(numChambre);
                $("#select_compoFamilleEnfant_" + numChambre).val($("#inpt_nbEnfants_" + numChambre).val());
            });
        }
        $(".select_compoFamilleEnfant").change(function () {
            var numChambre = getNumChambreByElem($(this));
            $(".td_ageEnfants_" + numChambre).hide();
            if ($(this).val() != 0) {
                for (var i = 1; i <= $(this).val(); i++) {
                    $("#td_ageEnfant_" + i + "_" + numChambre).show();
                }
                $("#div_compoFamilleAgeEnfants_" + numChambre).show("slow");
                if (!estResaGP() && $("#inpt_chambre_" + numChambre).attr("checked") == undefined) {
                    $("#inpt_chambre_" + numChambre).attr("checked", true);
                    $("#inpt_chambre_" + numChambre).change();
                }
                affectAgeEnfants(numChambre);
            }
            else {
                $("#div_compoFamilleAgeEnfants_" + numChambre).hide("slow");
                if (parseInt($('#select_compoFamilleAdulte_' + numChambre).val()) === 0) {
                    $("#inpt_chambre_" + numChambre).attr("checked", false);
                    $("#inpt_chambre_" + numChambre).change();
                }
            }
            mettreAjourListeRepas(numChambre);
            affectFamille("Enfants", numChambre);
        });
        $(".select_compoFamilleBebe").change(function () {
            var numChambre = getNumChambreByElem($(this));
            if ($(this).val() != 0) {
                etapeCourante($("#div_uneEtape_compoFamilleChambre"), true);
            }
            affectFamille("bebes", numChambre);
        });
        $(".select_compoFamilleAgeEnfants").change(function () {
            var numChambre = getNumChambreByElem($(this));
            if ($(".select_compoFamilleAgeEnfants_" + numChambre + ":visible").length == 1 || $(".select_compoFamilleAgeEnfants_" + numChambre + "[value=0]:visible").length == 0) {
                affectAgeEnfants(numChambre);
            }
        });
        $(".inpt_optionChambre").live('change', function () {
            var numChambre = getNumChambreByElem($(this));
            if ($(this).attr("checked") == undefined) {
                $(this).parent().next().next().children("select.select_optionChambre").val(0);
            }
            else {
                var nbAdultes = $("#select_compoFamilleAdulte_" + numChambre).val();
                $(this).parent().next().next().children("select.select_optionChambre").val(nbAdultes);
            }
            affectOptionsChambre();
        });
        $(".select_optionChambre").live('change', function () {
            affectOptionsChambre();
        });
        initListesDureeOption(true);
    })(jQuery);
}
function mettreAjourListeRepas(numChambre) {
    if (numChambre) {
        jQuery.each(jQuery(".optionChambre[numchambre=" + numChambre + "] .select_optionChambre").not('.select_optionChambre_enfants,.forfaitaire'), function () {
            var nbRepasAdultesAvant = jQuery(this).val()
            var nbAdultes = parseInt(jQuery("#select_compoFamilleAdulte_" + numChambre).val());
            var nbRepasEnfantsAvant = 0;
            var nbEnfants = 0;
            if (jQuery("#select_compoFamilleEnfant_" + numChambre)) {
                nbEnfants = parseInt(jQuery("#select_compoFamilleEnfant_" + numChambre).val());
            }
            var nbNuits = 1;
            if (jQuery("#sp_recapDatesDuree")) {
                nbNuits = jQuery("#sp_recapDatesDuree").html();
            }
            var htmlAdultes = '<option selected="selected" value="0">-</option>';
            for (i = 1; i < (nbAdultes * nbNuits + 1); i++) {
                htmlAdultes += '<option value="' + i + '">' + i + '</option>';
            }
            jQuery(this).html(htmlAdultes);
            if (jQuery(this).parent().children(".select_optionChambre_enfants" + numChambre).length > 0) {
                var maDivEnfant = jQuery(this).parent().children(".select_optionChambre_enfants" + numChambre);
                nbRepasEnfantsAvant = jQuery(maDivEnfant).val();
                var htmlEnfants = '<option';
                if (nbRepasEnfantsAvant == 0) {
                    htmlEnfants += ' selected="selected"';
                }
                htmlEnfants += ' value="0">-</option>';
                for (i = 1; i < (nbEnfants * nbNuits + 1); i++) {
                    htmlEnfants += '<option';
                    if (nbRepasEnfantsAvant == i) {
                        htmlEnfants += ' selected="selected"';
                    }
                    htmlEnfants += ' value="' + i + '">' + i + '</option>';
                }
                jQuery(maDivEnfant).html(htmlEnfants);
            }
            if (nbRepasAdultesAvant <= (nbAdultes * nbNuits) && nbRepasEnfantsAvant <= (nbEnfants * nbNuits)) {
                jQuery(this).val(nbRepasAdultesAvant);
            } else if (nbRepasAdultesAvant != (nbAdultes * nbNuits) || nbRepasEnfantsAvant != (nbEnfants * nbNuits)) {
                affectOptionsChambre();
            }
        });
    } else {
        jQuery.each(jQuery("#div_selectionChambre div.div_uneChambre"), function () {
            if (jQuery(this).attr('num').length > 0) {
                mettreAjourListeRepas(jQuery(this).attr('num'))
            }
        });
    }
}
function getNumChambreByElem(elem) {
    var numChambre;
    (function () {
        numChambre = elem.parents(".div_uneChambre").attr("num");
    })(jQuery);
    return numChambre;
}
function initDatePickerDeb() {
    (function ($) {
        var dateDeb = new Date();
        var dayNamesMin = $.datepicker._defaults.dayNamesMin;
        if (rafraichirSurUrlActuelleApresSelectDateFin || modeCalculPrixSurFiche) {
            var langue = initLangueForDatePicker();
            $.datepicker.setDefaults($.datepicker.regional[langue]);
            dayNamesMin = $.datepicker._defaults.dayNamesShort;
        }
        $("#div_datepickerDeb").datepicker({
            numberOfMonths: [1, nbMois],
            dateFormat: 'dd/mm/yy',
            minDate: dateDebPlanning,
            maxDate: dateFinPlanning,
            defaultDate: defaultDateDebut,
            dayNamesMin: dayNamesMin,
            beforeShowDay: setJour,
            onSelect: function (dateDeb) {
                setDateDeb(dateDeb);
            }
        });
        if (typeof(objDateDeb) != 'undefined') {
            $("#div_datepickerDeb").datepicker('setDate', objDateDeb);
        }
    })(jQuery);
}
function initDatePickerFin() {
    (function ($) {
        $("#div_datepickerFin").datepicker({
            numberOfMonths: [1, nbMois],
            dateFormat: 'dd/mm/yy',
            defaultDate: new Date(),
            beforeShowDay: setJour,
            onSelect: function (dateFin) {
                setDateFin(dateFin);
            }
        });
    })(jQuery);
}
function initChangeJourRef() {
    (function ($) {
        if ($('#select_resaJourReference')) {
            $("#select_resaJourReference").change(function () {
                var dateDeb = $("#inpt_resaDateDeb").val();
                var dateFin = $("#inpt_resaDateFin").val();
                var tabData = {type: "verifDates", dateDeb: dateDeb, dateFin: dateFin};
                if ($('#select_resaJourReference') && $('#select_resaJourReference').val() != null) {
                    tabData.jour_ref = $('#select_resaJourReference').val();
                }
                if (gestprod) {
                    tabData = {type: "verifDates_GP", dateDeb: dateDeb, dateFin: dateFin}
                }
                ajaxVerifDates(tabData);
            });
        }
    })(jQuery);
}
function initChangeHeureDebFin() {
    (function ($) {
        if ($('#select_heureArrivee').length == 0) {
            return;
        }
        $('#select_heureDepart').unbind('change');
        $('#select_heureArrivee').unbind('change');
        $('#select_heureDepart').bind('change', function () {
            var dateDeb = $("#inpt_resaDateDeb").val();
            var dateFin = $("#inpt_resaDateFin").val();
            var tabData = {type: "verifDates", dateDeb: dateDeb, dateFin: dateFin};
            if ($('#select_resaJourReference') && $('#select_resaJourReference').val() != null) {
                tabData.jour_ref = $('#select_resaJourReference').val();
            }
            tabData.heureDeb = $('#select_heureArrivee').val() || null;
            tabData.heureFin = $('#select_heureDepart').val() || null;
            if (gestprod) {
                tabData = {type: "verifDates_GP", dateDeb: dateDeb, dateFin: dateFin}
            }
            ajaxVerifDates(tabData);
        });
        $('#select_heureArrivee').bind('change', function () {
            if (typeof objDateDeb === 'undefined' || typeof objDateFin === 'undefined') {
                return false;
            }
            var dateDeb = $("#inpt_resaDateDeb").val();
            var dateFin = $("#inpt_resaDateFin").val();
            var tabData = {type: "verifDates", dateDeb: dateDeb, dateFin: dateFin};
            if ($('#select_resaJourReference') && $('#select_resaJourReference').val() != null) {
                tabData.jour_ref = $('#select_resaJourReference').val();
            }
            tabData.heureDeb = $('#select_heureArrivee').val() || null;
            tabData.heureFin = $('#select_heureDepart').val() || null;
            if (gestprod) {
                tabData = {type: "verifDates_GP", dateDeb: dateDeb, dateFin: dateFin}
            }
            ajaxVerifDates(tabData);
        });
    })(jQuery);
}
function setDateDeb(dateDeb) {
    (function ($) {
        objDateDeb = new Date();
        objDateDeb.setFullYear(dateDeb.substr(6, 4), dateDeb.substr(3, 2) - 1, dateDeb.substr(0, 2));
        objDateDeb.setHours(0);
        objDateDeb.setMinutes(0);
        objDateDeb.setSeconds(0);
        if (infoBulles) {
            var objDateDebPlanning = new Date(dateDebPlanning.substr(6, 4), dateDebPlanning.substr(3, 2) - 1, dateDebPlanning.substr(0, 2));
            var ecart = Math.round(ecartDate(objDateDeb, objDateDebPlanning));
            var infoBulle = infoBulles[ecart];
        }
        $("#inpt_resaDateDeb").val(dateDeb);
        if (estResaBureauGestloc() || estResaBureauProp()) {
            $('#select_heureArrivee').prop('disabled', false);
        }
        if ($("#div_choixDateFin").length > 0) {
            if ($("#div_choixDateFin").length > 0) {
                if ($("#inpt_resaDateFin").val() != "Départ") {
                    var dateFin = $("#inpt_resaDateFin").val();
                    objDateFin = new Date();
                    objDateFin.setFullYear(dateFin.substr(6, 4), dateFin.substr(3, 2) - 1, dateFin.substr(0, 2));
                    objDateFin.setHours(0);
                    objDateFin.setMinutes(0);
                    objDateFin.setSeconds(0);
                }
            }
            if (objDateFin && objDateDeb > objDateFin) {
                $("#inpt_resaDateFin").val("Départ");
            }
            $("#div_calendrierDeb").hide().removeClass("open");
            $("#div_roueDatepickerFin").show();
            var tabData = {type: "getPlanningFin", dateDeb: dateDeb, infoBulle: infoBulle};
            if (gestprod) {
                tabData = {type: "getPlanningFin_GP", dateDeb: dateDeb};
            }
            if (modeCalculPrixSurFiche) {
                tabData.estpresentsurfiche = true;
            }
            $.ajax({
                type: "POST", url: urlAJAX, async: false, data: tabData, beforeSend: function () {
                    $("#div_calendrierFin").show().addClass("open");
                }, success: function (result) {
                    eval("var tabResult=" + result);
                    if (tabResult.code == errDossierNull) {
                        retourEtape1(tabResult.msg);
                    }
                    else if (tabResult.errTechnq) {
                        afficheMsgErrTechnq(tabResult.msg, tabResult.titre, tabResult.ident, true);
                    }
                    else if (tabResult.pack) {
                        $('#inpt_resaDateFin').val(tabResult.dateFin);
                        setDateFin(tabResult.dateFin);
                    } else {
                        chainePlanning = tabResult.chaineDispo;
                        infoBulles = tabResult.infoBulle;
                        initDatePickerFin();
                        $("#div_datepickerFin").datepicker("option", "minDate", new Date(objDateDeb.getFullYear(), objDateDeb.getMonth(), objDateDeb.getDate() + 1));
                        $("#div_datepickerFin").datepicker("option", "maxDate", tabResult.dateFin);
                        $("#div_datepickerFin").datepicker("setDate", new Date(objDateDeb.getFullYear(), objDateDeb.getMonth(), objDateDeb.getDate() + 1));
                        $("#div_datepickerDeb").datepicker("destroy");
                    }
                    $("#div_roueDatepickerFin").hide();
                }
            });
        }
        else if ($("#div_choixNbNuits").length > 0) {
            initListeNbNuits(infoBulle);
            $("#div_choixNbNuits").show();
        }
        else if ($('#div_uneEtape_billetChoixPresta').length > 0) {
            objDateFin = new Date();
            var timestampDeb = Date.UTC(dateDeb.substr(6, 4), dateDeb.substr(3, 2) - 1, dateDeb.substr(0, 2));
            var timestampFin = timestampDeb + (24 * 60 * 60 * 1000);
            objDateFin.setTime(timestampFin);
            $("#div_calendrierDeb").hide().removeClass("open");
            tabData = {type: "verifDates_GP", dateDeb: dateDeb, dateFin: dateDeb};
            ajaxVerifDates(tabData);
        }
    })(jQuery);
}
function setDateFin(dateFin) {
    (function ($) {
        var dateDeb = $("#inpt_resaDateDeb").val();
        objDateDeb.setFullYear(dateDeb.substr(6, 4), dateDeb.substr(3, 2) - 1, dateDeb.substr(0, 2));
        if (objDateFin == undefined) {
            objDateFin = new Date();
            objDateFin.setHours(0);
            objDateFin.setMinutes(0);
            objDateFin.setSeconds(0);
        }
        objDateFin.setFullYear(dateFin.substr(6, 4), dateFin.substr(3, 2) - 1, dateFin.substr(0, 2));
        if (rafraichirSurUrlActuelleApresSelectDateFin) {
            var tabArgs = getTabValInQueryString() || [];
            var search = '';
            $(tabArgs).each(function () {
                var val = this[0] || false;
                if (val && val !== 'deb' & val !== 'nbj') {
                    search += '&' + val + '=' + this[1];
                }
            });
            location.search = search + '&deb=' + dateDeb + '&nbj=' + ecartDate(objDateFin, objDateDeb);
            return;
        }
        $("#div_confirmDispos span:first-child").hide();
        $("#div_confirmDispos span:last-child").hide();
        $("#inpt_resaDateFin").val(dateFin);
        if (estResaBureauGestloc() || estResaBureauProp()) {
            $('#select_heureDepart').prop('disabled', false);
        }
        $("#div_calendrierFin").hide().removeClass("open");
        var tabData = {type: "verifDates", dateDeb: dateDeb, dateFin: dateFin};
        if ($('#select_resaJourReference') && $('#select_resaJourReference').val() != null) {
            tabData.jour_ref = $('#select_resaJourReference').val();
        }
        if (gestprod) {
            tabData = {type: "verifDates_GP", dateDeb: dateDeb, dateFin: dateFin}
        }
        ajaxVerifDates(tabData);
    })(jQuery);
}
function ajaxVerifDates(tabData) {
    (function ($) {
        if (modeCalculPrixSurFiche) {
            if ($('#div_fiche_bloc_tarif_chmb_packDivDatesTarifs').length > 0) {
                var tabAttributs = $('#div_fiche_bloc_tarif_chmb_packDivDatesTarifs').attr('data-attributsDiv');
                var listeAttr = eval('(' + tabAttributs + ')');
                tabData.listeAttrDivChambres = listeAttr;
            }
            tabData.instance = $('#div_choixDates_packDivDatesTarifs').attr('data-instance');
            tabData.ident = $('#div_choixDates_packDivDatesTarifs').attr('data-ident');
            tabData.exercice = $('#div_choixDates_packDivDatesTarifs').attr('data-exercice');
            tabData.estpresentsurfiche = true;
        }
        $.ajax({
            type: "POST", url: urlAJAX, async: true, data: tabData, beforeSend: function () {
                $("#div_uneEtape_date").find(".inpt_validEtape").val("Non");
                affMsgAttenteParDessusInDiv("div_recapPrix", "recapPrix", txtAttente);
                if ($('.div_uneEtape_prodGP').length > 0) {
                    var idDivProd = $('.div_uneEtape_prodGP').attr('id');
                    affMsgAttenteParDessusInDiv(idDivProd, "recapPrix", txtVerifDispos);
                }
                if (modeCalculPrixSurFiche) {
                    $('.tarifFicheApartirDe').html('<img src="../../config_v3/imgs_defaut/loading/ajax-loader.gif" />').show();
                }
            }, success: function (result) {
                var tabRetour = XMLToArray(result);
                if (tabRetour.code == errDossierNull) {
                    retourEtape1(tabRetour.msg);
                }
                else if (tabRetour.errTechnq) {
                    var avecFormContact = false;
                    if (tabRetour.avecFormContact) {
                        avecFormContact = true;
                    }
                    if (modeCalculPrixSurFiche) {
                        $('.tarifFicheApartirDe').hide();
                        reinitDatepickers_packDivTarifs();
                    }
                    var msg = tabRetour.msg;
                    if (tabRetour.msgErreurCalculPrix) {
                        msg = tabRetour.msgErreurCalculPrix;
                    }
                    afficheMsgErrTechnq(msg, tabRetour.titre, tabRetour.ident, avecFormContact);
                }
                else {
                    if (tabRetour.code == "OK") {
                        if (modeCalculPrixSurFiche) {
                            if (tabRetour.exeMajFiche) {
                                var url = location.pathname;
                                url += '?deb=' + tabRetour.dateDebMajFiche;
                                url += '&nbj=' + tabRetour.nbjMajFiche;
                                url += '&exe=' + tabRetour.exeMajFiche;
                                location.href = url;
                                return;
                            }
                            majDivTarifAPartirDe(tabRetour);
                            if (tabRetour.htmlDivChambres) {
                                majDivChambres_packDivDatesTarifs(tabRetour);
                            } else {
                                majTarifsSelectionne(tabData.dateDeb, tabData.dateFin);
                            }
                            return;
                        }
                        if (tabRetour.modeResa != undefined) {
                            manageChangementTypeResa(tabRetour);
                            return;
                        }
                        if (typeof(dataLayer) != 'undefined') {
                            if (tabRetour.date_non_disponible == 1) {
                                ajouteOuRemplaceDansDataLayer({'event': 'availability', 'availability': false});
                            } else {
                                ajouteOuRemplaceDansDataLayer({'event': 'availability', 'availability': true});
                            }
                        }
                        if (tabRetour.maj) {
                            rechargementPageMAJ(tabRetour);
                        }
                        if ($('#div_choixModeResaGEGS').length > 0 && tabRetour.html_choixCompoFamille) {
                            if ($('#div_uneEtape_compoFamilleGite').length == 0 && $('#div_uneEtape_compoFamilleChambre').length == 0) {
                                $('#div_uneEtape_date').after(tabRetour.html_choixCompoFamille);
                                if ($("#div_uneEtape_compoFamilleGite").length > 0) {
                                    setEventsForGite();
                                } else {
                                    setEventsForChambre();
                                }
                            }
                        }
                        if (tabRetour.htmlAlertResasJoursIdentiques) {
                            if ($('#div_alertResaJoursIdentiques').length > 0) {
                                $('#div_alertResaJoursIdentiques').replaceWith(tabRetour.htmlAlertResasJoursIdentiques);
                            } else {
                                $('#div_choixDates').append(tabRetour.htmlAlertResasJoursIdentiques);
                            }
                        } else {
                            $('#div_alertResaJoursIdentiques').remove();
                        }
                        if (tabRetour.htmlAlertRestrictions) {
                            if ($('#div_alertRestrictions').length > 0) {
                                $('#div_alertRestrictions').replaceWith(tabRetour.htmlAlertRestrictions);
                            } else {
                                $('#div_choixDates').append(tabRetour.htmlAlertRestrictions);
                            }
                        } else {
                            $('#div_alertRestrictions').remove();
                        }
                        if ($('#div_choixJourReference').length > 0) {
                            $('#div_choixJourReference').show();
                        }
                        $(".div_uneChambre").each(function () {
                            if ($(this).find(".inpt_chambre").attr("checked") == undefined)
                                $(this).find(".select_optionChambre").attr("disabled", true);
                        });
                        $("tfoot").find("input").attr("disabled", true);
                        $("#div_uneEtape_date").next(".div_uneEtape").removeClass('div_uneEtapeGrisee');
                        $("#div_uneEtape_date").next(".div_uneEtape").find('*').attr("disabled", false);
                        if ($('#div_uneEtape_selectionOrigine').length > 0) {
                            $("#div_uneEtape_selectionOrigine").next(".div_uneEtape").removeClass('div_uneEtapeGrisee');
                            $("#div_uneEtape_selectionOrigine").next(".div_uneEtape").find('*').attr("disabled", false);
                        }
                        objDateDeb.setHours(0, 0, 0);
                        objDateFin.setHours(0, 0, 0);
                        nbJours = ecartDate(objDateFin, objDateDeb);
                        $("#sp_confirmDispos_nbNuits").html(nbJours);
                        $('#div_confirmDispos span.confirmSaisie.ko').html('').hide();
                        $("#div_recapInfos").html(tabRetour.recapInfos);
                        $(".sp_nbNuits").html(tabRetour.nbNuits);
                        if (tabRetour.htmlModifHoraires) {
                            if ($('.div_modifHoraires').length > 0) {
                                $('.div_modifHoraires').remove();
                            }
                            $('.div_modifHoraire_arrivee').replaceWith(tabRetour.htmlModifHoraires.arrivee);
                            $('.div_modifHoraire_depart').replaceWith(tabRetour.htmlModifHoraires.depart);
                            initChangeHeureDebFin();
                        }
                        if (tabRetour.htmlModifJourReference) {
                            $('.div_choixJourReference').replaceWith(tabRetour.htmlModifJourReference);
                            initChangeJourRef();
                            initChangeHeureDebFin();
                        }
                        if (tabRetour.msgInfoModeResa) {
                            $('.infosModeResa').html(tabRetour.msgInfoModeResa);
                            $('.infosModeResa').show();
                        }
                        else {
                            $('.infosModeResa').html('');
                            $('.infosModeResa').hide();
                        }
                        if ($("#div_uneEtape_compoFamilleGite").length > 0) {
                            afficheEffaceRecapPrix(tabRetour);
                            majListesDureeOption();
                        }
                        else if ($("#div_uneEtape_compoFamilleChambre").length > 0) {
                            if (!tabRetour.dateNonModifiee) {
                                $(".div_uneChambre").each(function () {
                                    $(this).hide();
                                    for (var i = 0; i < tabRetour.chambresDispo.length; i++) {
                                        if ($(this).attr("num") == tabRetour.chambresDispo[i]) {
                                            $(this).show();
                                            if (tabRetour.planVenteChambres) {
                                                $('#select_compoFamilleAdulte_' + tabRetour.chambresDispo[i]).attr('data-planVente', tabRetour.planVenteChambres[tabRetour.chambresDispo[i]]);
                                            }
                                        }
                                    }
                                });
                            }
                            if ($(".div_uneChambre:visible").find(".inpt_chambre:checked").length == 0) {
                                $("#div_recapPrix").hide();
                                if ($(".div_uneChambre:not(visible)").find(".inpt_chambre:checked").length > 0) {
                                    $(".div_uneChambre:not(visible)").find(".inpt_chambre:checked").each(function () {
                                        $(this).attr("checked", false);
                                        var num = $(this).parents(".div_uneChambre").attr("num");
                                        $("#tr_prixChambre_" + num).hide();
                                    });
                                }
                            }
                            else {
                                metAJourRecapPrixForChambre();
                            }
                            if (tabRetour.htmlOptionsChambres) {
                                tabRetour.htmlOptionsChambres.each(function (elem) {
                                    var idElement = elem.idElement;
                                    var html = elem.html;
                                    var nbAdultes = elem.nbAdultes;
                                    var div_uneChambreTarifsOption = $('#' + idElement).find('.div_uneChambreTarifsOption');
                                    div_uneChambreTarifsOption.html(html);
                                    if (nbAdultes === '' || nbAdultes === '0') {
                                        div_uneChambreTarifsOption.toggleClass('div_uneChambreTarifsOptionGrisee', true);
                                        div_uneChambreTarifsOption.find('*').attr('disabled', true);
                                    }
                                });
                            }
                            majListesDureeOption(true);
                        } else if ($('.div_uneEtape_prodGP').length > 0) {
                            var idDivProd = $('.div_uneEtape_prodGP').attr('id');
                            $(".div_uneEtape_prodGP").replaceWith(tabRetour.HTML_choixChambre);
                            $(".div_uneEtape_prodGP").removeClass('div_uneEtapeGrisee');
                            if (tabRetour.recapInfos.length > 0) {
                                $("#div_recapInfosEtPrix").show();
                            }
                            if (!afficheRecapPrix) {
                                $("#div_recapPrix").hide();
                            }
                            majNumEtapes();
                            if (idDivProd == 'div_uneEtape_packageChoixTarif') {
                                chargeAlternatives();
                            }
                            initDescTarifQTip();
                            reinitSelectionLignesFactures();
                        }
                        $("#sp_recapDateDeb").html(tabData.dateDeb);
                        $("#sp_recapDateFin").html(tabData.dateFin);
                        $("#sp_recapDatesDuree").html(nbJours);
                        if (nbJours > 1) {
                            $("#sp_recapDateLblNuits").css("display", "inline");
                            $("#sp_recapDateLblNuit").css("display", "none");
                        }
                        else {
                            $("#sp_recapDateLblNuits").css("display", "none");
                            $("#sp_recapDateLblNuit").css("display", "inline");
                        }
                        var elemToREmove = $("#div_uneEtape_date .div_uneEtapeRecap").find('.classForcageParametresPV');
                        $(elemToREmove).remove();
                        if (typeof(tabRetour.explicationsForcagePV) != 'undefined') {
                            $("#div_uneEtape_date .div_uneEtapeRecap").append(tabRetour.explicationsForcagePV);
                        }
                        etapeCourante($("#div_uneEtape_date"), true);
                        $("#div_msgDatesNull").hide();
                        $("#div_recapInfos").show();
                        $("#div_uneEtape_date").find(".inpt_validEtape").val("Oui");
                        if ($("#div_uneEtape_canevas").length > 0) {
                            initCanevasResaCouplee(tabRetour.reinitCanevas);
                        }
                        mettreAjourListeRepas();
                    }
                    else {
                        if (modeCalculPrixSurFiche) {
                            majDivTarifAPartirDe(tabRetour);
                            if (tabRetour.htmlDivChambres) {
                                majDivChambres_packDivDatesTarifs(tabRetour);
                            } else {
                                majTarifsSelectionne(tabData.dateDeb, tabData.dateFin);
                            }
                            return;
                        }
                        if (tabRetour.errLD != undefined) {
                            effaceMsgAttenteParDessus("recapPrix");
                            $('#div_recapPrix').hide();
                            $("#inpt_resaDateFin").val("Départ");
                            $("#inpt_resaDateDeb").val("Arrivée");
                            alertAJquery(tabRetour.msg);
                            return;
                        }
                        if (tabRetour.datesProches && typeof(dataLayer) != 'undefined') {
                            dataLayer.push({'event': 'resa_datesProches'});
                        }
                        if (typeof(dataLayer) != 'undefined') {
                            ajouteOuRemplaceDansDataLayer({'event': 'availability', 'availability': false});
                        }
                        $("#div_confirmDispos").find(".ko").text(tabRetour.msg);
                        $("#div_confirmDispos").find(".ko").show();
                        $("#div_uneEtape_date .div_uneEtapeRecap").hide();
                        if ($("#inpt_avecRepli").length > 0) {
                            $("#div_uneEtape_date .div_uneEtapeContent").show();
                        }
                        $("#div_uneEtape_date").find(".inpt_validEtape").val("Non");
                    }
                }
                effaceMsgAttenteParDessus("recapPrix");
            }
        });
    })(jQuery)
}
function initPrix() {
    (function ($) {
        if (location.search.indexOf("PHPSESSID") > -1) {
            afficheRecapPrix = true;
        }
        var dateDeb = $("#inpt_resaDateDeb").val();
        var dateFin;
        objDateDeb = new Date();
        objDateDeb.setFullYear(dateDeb.substr(6, 4), dateDeb.substr(3, 2) - 1, dateDeb.substr(0, 2));
        if ($("#div_choixDateFin").length > 0) {
            dateFin = $("#inpt_resaDateFin").val();
            objDateFin = new Date();
            objDateFin.setFullYear(dateFin.substr(6, 4), dateFin.substr(3, 2) - 1, dateFin.substr(0, 2));
        }
        else if ($("#div_choixNbNuits").length > 0) {
            initListeNbNuits();
            var duree = $("#inpt_nbNuits").val();
            duree = parseInt(duree);
            objDateFin = new Date();
            objDateFin.setFullYear(objDateDeb.getFullYear(), objDateDeb.getMonth(), objDateDeb.getDate() + duree);
            var jour, mois, annee;
            if (objDateFin.getDate().toString().length == 1)
                jour = "0" + objDateFin.getDate(); else
                jour = objDateFin.getDate();
            if (objDateFin.getMonth().toString().length == 1)
                mois = "0" + (objDateFin.getMonth() + 1); else
                mois = objDateFin.getMonth() + 1;
            annee = objDateFin.getFullYear();
            dateFin = jour + "/" + mois + "/" + annee;
        }
        $("#inpt_resaDateDeb").click();
        if ($("#div_uneEtape_date").find(".inpt_validEtape").val() == "Oui") {
            $("#sp_fermerCalDateDeb").click();
            setDateDeb(dateDeb);
            if ($('#div_uneEtape_billetChoixPresta').length == 0 && $('#div_uneEtape_packageChoixTarif').length == 0) {
                setDateFin(dateFin);
            }
        }
    })(jQuery);
}
function initListeNbNuits(infoBulle) {
    (function ($) {
        var dateDeb = $("#inpt_resaDateDeb").val();
        var duree = $("#inpt_nbNuits").val();
        $.ajax({
            type: "POST",
            url: urlAJAX,
            data: {type: "getListeNbNuits", dateDeb: dateDeb, duree: duree, infoBulle: infoBulle},
            beforeSend: function () {
                $("#img_roueDatePicker").show();
            },
            success: function (result) {
                eval("var tabResult=" + result);
                if (tabResult.code == errDossierNull) {
                    retourEtape1(tabResult.msg);
                }
                else if (tabResult.errTechnq) {
                    afficheMsgErrTechnq(tabResult.msg, tabResult.titre, tabResult.ident, true);
                }
                else {
                    if (tabResult.code == "OK") {
                        $("#select_nbNuits").html(tabResult.listeNbNuits);
                    }
                }
                $("#img_roueDatePicker").hide();
            }
        });
    })(jQuery);
}
function ecartDate(date1, date2) {
    var unJour = 24 * 60 * 60 * 1000;
    return Math.round((date1.getTime() - date2.getTime()) / (unJour));
}
function setJour(date) {
    var ObjDateDeb = new Date(dateDebPlanning.substr(6, 4), dateDebPlanning.substr(3, 2) - 1, dateDebPlanning.substr(0, 2));
    var ecart = Math.round(ecartDate(date, ObjDateDeb));
    var caractere = chainePlanning.charAt(ecart);
    var infoBulle;
    if (infoBulles)
        infoBulle = infoBulles[ecart]; else
        infoBulle = "";
    var sejour = '';
    if (typeof(objDateDeb) != 'undefined' && typeof(objDateFin) != 'undefined' && objDateFin) {
        var ecartDateDeb = Math.round(ecartDate(objDateDeb, ObjDateDeb));
        var ecartDateFin = Math.round(ecartDate(objDateFin, ObjDateDeb));
        if (ecartDateDeb <= ecart && ecartDateFin >= ecart) {
            sejour = 'sejour';
            if (ecart == ecartDateDeb) {
                sejour += ' dateArrivee';
            }
            if (ecart == ecartDateFin) {
                sejour += ' dateFin';
            }
        }
    }
    var classe = sejour + ' ';
    if (caractere == ".") {
        classe += 'cliquable';
        return [true, classe, infoBulle];
    }
    else if (caractere == "o" || caractere == "O") {
        classe += 'option';
        if (gestprod) {
            return [false, classe];
        } else {
            return [true, classe];
        }
    }
    else if (caractere == "r" || caractere == "R") {
        classe += 'resa';
        return [false, classe];
    }
    else if (caractere == "l") {
        classe += 'libre';
        if (gestprod) {
            return [false, classe];
        } else {
            return [true, classe];
        }
    }
    else if (caractere == "n") {
        classe += 'occupe';
        return [false, classe];
    }
    else if (caractere == "b") {
        classe += 'avantDatesPossibles';
        return [false, classe];
    }
    else if (caractere == "j") {
        classe += 'dateArrivee';
        return [false, classe];
    }
    else if (caractere == "i") {
        classe += 'intention';
        return [false, classe];
    }
    else if (caractere == "d") {
        classe += 'devis';
        return [true, classe];
    }
    else if (caractere == "f") {
        classe += 'forcage';
        return [true, classe];
    }
    else if (!caractere && ecart >= chainePlanning.length) {
        classe += 'occupe';
        return [false, classe];
    } else if (caractere == "?" || caractere == "a") {
        classe += 'inconnu';
        if (gestprod) {
            return [false, classe];
        } else {
            return [true, classe];
        }
    }
    else if (ecart >= 0) {
        return [false, "inconnu"];
    } else {
        return [false, "avantDatesPossibles"];
    }
}
function metAJourListeFamille(numChambre) {
    (function ($) {
        $("#div_compoFamille_msgReinitEnfant").hide();
        var suffixe = "";
        if (numChambre)
            suffixe = "_" + numChambre;
        var capacite = $("#select_compoFamilleAdulte" + suffixe).children().length - 1;
        var capaciteReel;
        try {
            capaciteReel = parseInt($("#select_compoFamilleAdulte" + suffixe).attr('data-capacite'));
        }
        catch (e) {
            capaciteReel = capacite;
        }
        var nbAdultes = parseInt($("#select_compoFamilleAdulte" + suffixe).val());
        var nbEnfants = parseInt($("#select_compoFamilleEnfant" + suffixe).val());
        var nbEnfantsMax = capacite - nbAdultes;
        if (nbEnfantsMax <= -1)
            nbEnfantsMax = 0;
        if ($("#select_compoFamilleEnfant" + suffixe + " option:last-child").val() < nbEnfantsMax) {
            var valAjout = $("#select_compoFamilleEnfant" + suffixe + " option:last-child").val();
            while ($("#select_compoFamilleEnfant" + suffixe + " option:last-child").val() < nbEnfantsMax) {
                valAjout++;
                var classeSurcapacite = '';
                var addition = $("#select_compoFamilleEnfant" + suffixe + " option").length + nbAdultes;
                if (addition > capaciteReel) {
                    classeSurcapacite = 'surcapacite';
                }
                $("#select_compoFamilleEnfant" + suffixe).append("<option value='" + valAjout + "' class='" + classeSurcapacite + "'>" + valAjout + "</option>");
            }
        }
        else {
            while ($("#select_compoFamilleEnfant" + suffixe + " option:last-child").val() > nbEnfantsMax) {
                $("#select_compoFamilleEnfant" + suffixe + " option:last-child").remove();
            }
        }
        $("#select_compoFamilleEnfant" + suffixe + " option").each(function () {
            if ((parseInt($(this).val()) + nbAdultes) > capaciteReel) {
                $(this).addClass('surcapacite');
            }
            else {
                $(this).removeClass('surcapacite');
            }
        });
        if (nbEnfantsMax == 0) {
            $("#select_compoFamilleEnfant" + suffixe).attr('disabled', true);
        }
        else {
            $("#div_infoCompoEnfants" + suffixe).show();
            $("#select_compoFamilleEnfant" + suffixe).attr('disabled', false);
        }
        if (nbEnfants > nbEnfantsMax && nbEnfantsMax > 0) {
            $("#div_compoFamille_msgReinitEnfant").show("pulsate", {times: 3}, "slow");
            $("#div_compoFamilleAgeEnfants" + suffixe).hide();
        }
        if (estResaGP()) {
            if ($("#select_compoFamilleAdulte" + suffixe).val() == 0) {
                $("#select_compoFamilleEnfant" + suffixe).html("<option value='0'>-</option>");
            }
        }
    })(jQuery);
}
function etapeCourante(elem, repli) {
    (function ($) {
        if ($("#inpt_avecRepli").length > 0) {
            if (elem.attr("id") != "div_uneEtape_compoFamilleChambre") {
                elem.find(".a_modifEtape").show();
                if (repli) {
                    elem.children(".div_uneEtapeContent").hide("slow");
                    elem.children(".div_uneEtapeRecap").show("slow");
                }
                if (elem.hasClass('div_uneEtapeCurr')) {
                    elem.next().addClass('div_uneEtapeCurr');
                    elem.removeClass('div_uneEtapeCurr');
                    if (elem.next().children(".div_uneEtapeRecap").is(":visible")) {
                        etapeCourante(elem.next(), repli);
                    }
                }
            }
        }
        else if (elem.attr("id") == "div_uneEtape_date") {
            $("#div_uneEtape_date > div.div_uneEtapeRecap").show();
        }
        elem.find(".inpt_validEtape").val("Oui");
        elem.removeClass('div_uneEtapeAValider');
        $("#div_msgErreurs").hide();
    })(jQuery);
}
function afficheEffaceOptions(typeOptions) {
    (function ($) {
        switch (typeOptions) {
            case"Animaux":
                $("tr.animal").each(function () {
                    var nbAnimaux = (parseInt($("#select_compoAnimauxChat").val()) + parseInt($("#select_compoAnimauxChien").val()));
                    if (nbAnimaux > 0) {
                        $(this).find(".sp_optionObligatoire").html(nbAnimaux);
                        $(this).find(".inpt_optionObligatoire").val(nbAnimaux);
                        $(this).parents("#div_infosOptionsAnimaux").show();
                    }
                    else {
                        if ($(this).is(":not(.obligatoire)")) {
                            $(this).find(".select_optionAnimaux").val(0);
                            $(this).find(".inpt_optionIndiv").checked = false;
                            $(this).find(".inpt_optionIndiv").attr("checked", false);
                        }
                        $(this).parents("#div_infosOptionsAnimaux").hide();
                    }
                });
                break;
            case"AnimauxChambre":
                break;
            case"Adultes":
                $("tr.indiv.obligatoire:not(.animal)").each(function () {
                    if (parseInt($("#select_compoFamilleAdulte").val()) > 0) {
                        if ($(this).children("td").children("span").has("input.inpt_optionEnfants").length) {
                            var nbEnfants = (parseInt($("#select_compoFamilleEnfant").val()));
                            var nbAdultes = (parseInt($("#select_compoFamilleAdulte").val()));
                            $(this).find("span.sp_optionEnfants").html(nbEnfants);
                            $(this).find("input.inpt_optionEnfants").val(nbEnfants);
                            $(this).find("span.sp_optionAdultes").html(nbAdultes);
                            $(this).find("input.inpt_optionAdultes").val(nbAdultes);
                        }
                        else {
                            var nbPers = (parseInt($("#select_compoFamilleAdulte").val()) + parseInt($("#select_compoFamilleEnfant").val()));
                            $(this).find(".sp_optionObligatoire").html(nbPers);
                            $(this).find(".inpt_optionObligatoire").val(nbPers);
                        }
                        $(this).show();
                        $(this).parents("#div_infosOptionsObligatoires").show();
                    }
                    else {
                        $(this).hide();
                        $(this).parents("#div_infosOptionsObligatoires").hide();
                    }
                });
                break;
        }
    })(jQuery);
}
function afficheEffaceOptionsSupplementaireObligatoires(numOption, numchambre, valFinale) {
    (function ($) {
        $('#select_optionChambre_' + numOption + '_' + numchambre).val(valFinale);
        $('#select_optionChambre_' + numOption + '_' + numchambre).trigger('change');
        if ($('#remplace_select_optionChambre_' + numOption + '_' + numchambre)) {
            if (valFinale == '0') {
                valFinale = '-';
            }
            $('#remplace_select_optionChambre_' + numOption + '_' + numchambre).html(valFinale);
        }
    })(jQuery);
}
function initListesDureeOption(optionsChambre) {
    (function ($) {
        if (optionsChambre) {
            if ($('.div_uneChambreTarifsOption .select_dureeForOption').length > 0) {
                $('.div_uneChambreTarifsOption .select_dureeForOption').live('change', function () {
                    affectOptionsChambre();
                });
            }
        } else {
            if ($('#div_optionsSuppl .select_dureeForOption').length > 0) {
                $('#div_optionsSuppl .select_dureeForOption').change(function () {
                    affectOptions();
                });
            }
        }
    })(jQuery);
}
function majListesDureeOption(optionsChambre) {
    (function ($) {
        $('#div_optionsSuppl .select_dureeForOption, .div_uneChambreTarifsOption .select_dureeForOption').each(function () {
            var nbMax = nbJours * 2;
            $(this).find('option').each(function () {
                var duree = $(this).val();
                if (duree <= nbMax) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
                if (duree == nbJours) {
                    $(this).attr('selected', true);
                }
            });
        });
        if (optionsChambre) {
            affectOptionsChambre();
        } else {
            affectOptions();
        }
    })(jQuery);
}
function metAJourRecapPrix() {
    (function ($) {
        if ($(".option:visible:has(input:checked)").length > 0) {
            affectOptions();
        }
        else {
            $.ajax({
                type: "POST", url: urlAJAX, data: {type: "recupPrix"}, beforeSend: function () {
                    affMsgAttenteParDessusInDiv("div_recapPrix", "recapPrix", txtAttente);
                }, success: function (result) {
                    eval("var tabResult=" + result);
                    if (tabResult.code == errDossierNull) {
                        retourEtape1(tabResult.msg);
                    }
                    else if (tabResult.errTechnq) {
                        afficheMsgErrTechnq(tabResult.msg, tabResult.titre, tabResult.ident, true);
                    }
                    else {
                        afficheEffaceRecapPrix(tabResult);
                    }
                    effaceMsgAttenteParDessus("recapPrix");
                }
            });
        }
    })(jQuery);
}
function metAJourRecapPrixForChambre() {
    (function ($) {
        $.ajax({
            type: "POST", url: urlAJAX, data: {type: "recupPrixForChambre"}, beforeSend: function () {
                affMsgAttenteParDessusInDiv("div_recapPrix", "recapPrix", txtAttente);
            }, success: function (result) {
                var tabResult = XMLToArray(result);
                if (tabResult.code == errDossierNull) {
                    retourEtape1(tabResult.msg);
                }
                else if (tabResult.errTechnq) {
                    afficheMsgErrTechnq(tabResult.msg, tabResult.titre, tabResult.ident, true);
                }
                else {
                    afficheEffaceRecapPrix(tabResult);
                }
                effaceMsgAttenteParDessus("recapPrix");
            }
        });
    })(jQuery);
}
function verifMotMagique(nepaseffacer) {
    (function ($) {
        var motMagique = $("#inpt_motMagique").val();
        var dateDeb = $("#inpt_resaDateDeb").val();
        var dateFin = $("#inpt_resaDateFin").val();
        $.ajax({
            type: "POST",
            url: urlAJAX,
            data: {type: "verifMotMagique", motMagique: motMagique, dateDeb: dateDeb, dateFin: dateFin},
            async: false,
            beforeSend: function () {
                affMsgAttenteParDessusInDiv("div_recapPrix", "recapPrix", txtAttente);
            },
            success: function (result) {
                var tabResult = XMLToArray(result);
                if (tabResult.code == errDossierNull) {
                    retourEtape1(tabResult.msg);
                }
                else if (tabResult.errTechnq) {
                    afficheMsgErrTechnq(tabResult.msg, tabResult.titre, tabResult.ident, true);
                }
                else {
                    if (tabResult.code == "OK") {
                        $("#div_motMagique").find(".ok").show();
                        $("#div_motMagique").find(".ko").hide();
                        if (gestprod) {
                            afficheEffaceRecapPrix_Prod(tabResult);
                        } else {
                            afficheEffaceRecapPrix(tabResult);
                        }
                    }
                    else {
                        $("#div_motMagique").find(".ko").show();
                        $("#div_motMagique").find(".ok").hide();
                    }
                }
                effaceMsgAttenteParDessus("recapPrix");
            }
        });
        if (!nepaseffacer) {
            $("#inpt_motMagique").val("");
        }
    })(jQuery);
}
function afficheEffaceRecapPrix(tabResult) {
    (function ($) {
        var effacerPrix = tabResult.effacerPrix || false;
        if (effacerPrix == '1') {
            $('#div_recapPrix').hide();
            return;
        }
        var numOpt;
        if (tabResult.acompteSansAssurance) {
            tabResult.acompte = tabResult.acompteSansAssurance;
            $(".tr_prixAssurAnnul").hide();
            $(".sp_recapAvecAssurAnnul").hide();
            $(".sp_recapSansAssurAnnul").show();
        }
        else {
            $(".tr_prixAssurAnnul").show();
        }
        if (tabResult.motsMagiques == "Oui")
            $("#div_uneEtape_motMagique").show();
        if (tabResult.promo && tabResult.promo.length > 0)
            $("#tr_prixPromotion").show(); else
            $("#tr_prixPromotion").hide();
        if (tabResult.tauxRemise && tabResult.tauxRemise.length > 0)
            $("#tr_prixRemise").show(); else
            $("#tr_prixRemise").hide();
        if (tabResult.options && tabResult.options.length > 0) {
            $("#tr_prixOptions").show();
        }
        $("td.td_prixTotal").html(tabResult.total);
        if (tabResult.prixModifie && $('#input_prixModifieBureau')) {
            $('#input_prixModifieBureau').val(tabResult.prixModifie);
        }
        if (tabResult.location) {
            $("#td_prixLocation").html(tabResult.location);
        } else {
            $(".td_prixChambre").parent().hide();
            var prixChambres = tabResult.prixChambres;
            if (prixChambres) {
                for (var i = 0; i < prixChambres.length; i++) {
                    var num = prixChambres[i].numChambre;
                    var prixAdu = prixChambres[i].prixAdu;
                    $(".td_prixChambre[numchambre=" + num + "]").html(prixAdu);
                    $(".td_prixChambre[numchambre=" + num + "]").parent().show();
                }
            }
        }
        $(".tr_prixOptionsChambre").hide();
        $(".tr_prixOptionChambre").hide();
        $(".tr_prixOptionsChambre").removeClass('show');
        var prixOptions = tabResult.prixOptions;
        if (prixOptions) {
            for (var i = 0; i < prixOptions.length; i++) {
                numChambre = prixOptions[i].numChambre;
                numOption = prixOptions[i].numOption;
                prixAdu = prixOptions[i].prixAdu;
                prixEnf = prixOptions[i].prixEnf;
                if (prixEnf && prixEnf != '0 &euro;') {
                    if (prixAdu != '0 &euro;') {
                        prixAdu = prixAdu + "<br/>" + prixEnf;
                    } else {
                        prixAdu = prixEnf;
                    }
                }
                if (prixAdu == '0 &euro;') {
                    $(".td_prixOptionChambre[numchambre=" + numChambre + "][numoption=" + numOption + "]").html('');
                    $(".td_prixOptionChambre[numchambre=" + numChambre + "][numoption=" + numOption + "]").parent().hide();
                    if (!$(".td_prixOptionChambre[numchambre=" + numChambre + "][numoption=" + numOption + "]").parents(".tr_prixOptionsChambre").hasClass('show')) {
                        $(".td_prixOptionChambre[numchambre=" + numChambre + "][numoption=" + numOption + "]").parents(".tr_prixOptionsChambre").hide();
                        $(".td_prixOptionChambre[numchambre=" + numChambre + "][numoption=" + numOption + "]").parents(".tr_prixOptionsChambre").addClass('hide');
                    }
                } else {
                    $(".td_prixOptionChambre[numchambre=" + numChambre + "][numoption=" + numOption + "]").html(prixAdu);
                    $(".td_prixOptionChambre[numchambre=" + numChambre + "][numoption=" + numOption + "]").parent().show();
                    $(".td_prixOptionChambre[numchambre=" + numChambre + "][numoption=" + numOption + "]").parents(".tr_prixOptionsChambre").show();
                    $(".td_prixOptionChambre[numchambre=" + numChambre + "][numoption=" + numOption + "]").parents(".tr_prixOptionsChambre").addClass('show');
                }
            }
        }
        $("#tr_prixOptions").hide();
        $(".tr_recap_option").hide();
        if (tabResult.tabTarifs) {
            $("#tr_prixOptions").show();
            var tabTarifs = tabResult.tabTarifs;
            for (i = 0; i < tabTarifs.length; i++) {
                numOpt = tabTarifs[i].noTarif;
                prixAdu = tabTarifs[i].prix;
                $("#td_recap_prixOption_" + numOpt).html(prixAdu);
                $("#tr_recap_option_" + numOpt).show();
            }
        }
        $(".td_prixAcompte").html(tabResult.acompte);
        if (tabResult.assurance) {
            $(".td_prixAssurAnnul").html(tabResult.assurance);
            if (!tabResult.acompteSansAssurance) {
                $(".tr_prixAssurAnnul").show();
            }
        } else {
            $(".tr_prixAssurAnnul").hide();
        }
        if ($('#tr_prixRetrocession').length > 0 && tabResult.montantRetro) {
            $('#td_prixRetrocession').html(tabResult.montantRetro);
        }
        $("#sp_code_formule_assurance").html(tabResult.code_formule_assurance);
        if (tabResult.fraisDossier) {
            $("#td_prixFraisDossier").html(tabResult.fraisDossier);
            $("#tr_prixFraisDossier").show();
        } else {
            $("#tr_prixFraisDossier").hide();
        }
        $("#td_prixPromotion").html(tabResult.promo);
        $("#td_prixRemise").html(tabResult.tauxRemise);
        $('#td_dateEcheance .sp_dateEcheance').html(tabResult.dateLimite);
        if (tabResult.dateLimite) {
            $('#tr_dateEcheance').show();
        } else {
            $('#tr_dateEcheance').hide();
        }
        if ($('#div_uneEtape_compoFamilleChambre').length === 0 || $('.div_uneChambre:visible').find('.inpt_chambre:checked').length > 0) {
            $("#table_recapPrix").show();
            $("#div_recapPrix").show();
        }
        if (tabResult.total == tabResult.acompte)
            $(".tr_prixAcompte").hide(); else
            $(".tr_prixAcompte").show();
        var montantAssurance = tabResult.assurance;
        $("#sp_montantAssur").html(montantAssurance);
        majAssurance(tabResult);
        if ($('#div_uneEtape_fraisDossier').is(':hidden')) {
            $('#div_uneEtape_fraisDossier').show();
        }
        $("#div_recapInfosEtPrix").show();
        i = 0;
        $("#table_recapPrix tr:visible").each(function () {
            if (i % 2 == 0) {
                $(this).addClass('pair');
                $(this).removeClass('impair');
            }
            else {
                $(this).addClass('impair');
                $(this).removeClass('pair');
            }
            i++;
        });
        if ($('#div_uneEtape_optionsSuppl .option.weRelax').length > 0) {
            $('#div_uneEtape_optionsSuppl .option.weRelax').remove();
        }
        if ($('#tr_recap_option_weRelax').length > 0) {
            $('#tr_recap_option_weRelax').remove();
        }
        if (tabResult.htmlOptionWeRelax) {
            $('#div_uneEtape_optionsSuppl table tbody').append(tabResult.htmlOptionWeRelax);
            $('.select_optionWeRelax').change(function () {
                affectOptions();
            });
            if (tabResult.htmlRecapOptionWeRelax) {
                $('#tr_prixLocation').after(tabResult.htmlRecapOptionWeRelax);
            }
        }
    })(jQuery);
}
function affectChambre(numChambre, annulChoix) {
    (function ($) {
        var params = {type: "affectChambre", numChambre: numChambre, annulChoix: annulChoix}
        if (numChambre) {
            params.nbAdultes = $("#select_compoFamilleAdulte_" + numChambre).val();
            params.nbEnfants = $("#select_compoFamilleEnfant_" + numChambre).val();
            params.nbBebes = $("#select_compoFamilleBebe_" + numChambre).val();
        }
        $.ajax({
            type: "POST", url: urlAJAX, async: false, data: params, beforeSend: function () {
            }, success: function (result) {
                var tabResult = XMLToArray(result);
                if (tabResult.modeResa) {
                    manageChangementTypeResa(tabResult, true);
                }
                else if (tabResult.prixChambres) {
                    afficheEffaceRecapPrix(tabResult);
                }
                else if ($(".inpt_chambre:checked").length == 0) {
                    $("#div_recapPrix").hide();
                }
            }
        });
    })(jQuery);
}
function affectFamille(type, numChambre) {
    (function ($) {
        var nbAdultes, nbEnfants, nbBebes;
        if (numChambre) {
            nbAdultes = $("#select_compoFamilleAdulte_" + numChambre).val();
            nbEnfants = $("#select_compoFamilleEnfant_" + numChambre).val();
            nbBebes = $("#select_compoFamilleBebe_" + numChambre).val();
        }
        else {
            nbAdultes = $("#select_compoFamilleAdulte").val();
            nbEnfants = $("#select_compoFamilleEnfant").val();
            nbBebes = $("#select_compoFamilleBebe").val();
            var majOptions = false;
            if ($(".option.obligatoire:not(.animal)").length > 0)
                majOptions = true;
            if (type == "bebes")
                majOptions = false;
        }
        $.ajax({
            type: "POST",
            url: urlAJAX,
            data: {
                type: "affectFamille",
                nbAdultes: nbAdultes,
                nbEnfants: nbEnfants,
                nbBebes: nbBebes,
                numChambre: numChambre
            },
            beforeSend: function () {
                affMsgAttenteParDessusInDiv("div_recapPrix", "recapPrix", txtAttente);
            },
            success: function (result) {
                var tabResult = XMLToArray(result);
                if (tabResult.code == errDossierNull) {
                    retourEtape1(tabResult.msg);
                }
                else if (tabResult.errTechnq) {
                    afficheMsgErrTechnq(tabResult.msg, tabResult.titre, tabResult.ident, true);
                }
                else {
                    if (tabResult.code == "KO") {
                        $("#div_recapInfosEtPrix").hide();
                        afficheMsgErrTechnq(tabResult.msg, '', '', false);
                    }
                    else {
                        if (tabResult.total)
                            afficheEffaceRecapPrix(tabResult);
                        $("#div_recapInfosEtPrix").show();
                        if (majOptions)
                            affectOptions();
                        $("#div_uneEtape_compoFamilleGite").find(".p_recapCompoFamilleGite").html(tabResult.msg);
                        $("#div_recapOptionsObligatoires").html(tabResult.options);
                        $("#div_recapOptionsObligatoires").find("tr:last").addClass("last");
                    }
                    $(".div_uneEtapeGrisee *").attr("disabled", false);
                    $('.div_uneEtapeGrisee').removeClass('div_uneEtapeGrisee');
                    $("#div_recapInfos").html(tabResult.recapInfos);
                }
                effaceMsgAttenteParDessus("recapPrix");
                rendChoixCanevasPossible();
                var capaciteReel;
                try {
                    var suffixe = "";
                    var divParent = '.div_uneEtape';
                    if (numChambre) {
                        divParent = '.div_uneChambre';
                        suffixe = "_" + numChambre;
                    }
                    capaciteReel = parseInt($("#select_compoFamilleAdulte" + suffixe).attr('data-capacite'));
                    if ((parseInt(nbAdultes) + parseInt(nbEnfants)) > capaciteReel) {
                        $("#select_compoFamilleAdulte" + suffixe).parents(divParent).find('.messageSurcapacite').show('fast');
                    }
                    else {
                        $("#select_compoFamilleAdulte" + suffixe).parents(divParent).find('.messageSurcapacite').hide();
                    }
                }
                catch (e) {
                }
            }
        });
    })(jQuery);
}
function affectAgeEnfants(numChambre) {
    (function ($) {
        var suffixe = "";
        if (numChambre)
            suffixe = "_" + numChambre;
        var i = 0;
        var tabAgeEnfants = new Array();
        $(".select_compoFamilleAgeEnfants" + suffixe + ":visible").each(function () {
            tabAgeEnfants[i] = $(this).val();
            i++;
        });
        $.ajax({
            type: "POST",
            url: urlAJAX,
            data: {type: "affectAgeEnfants", ageEnfants: tabAgeEnfants, numChambre: numChambre},
            beforeSend: function () {
            },
            success: function (result) {
                eval("var tabResult=" + result);
                if (tabResult.code == errDossierNull) {
                    retourEtape1(tabResult.msg);
                }
                else if (tabResult.errTechnq) {
                    afficheMsgErrTechnq(tabResult.msg, tabResult.titre, tabResult.ident, true);
                }
            }
        });
    })(jQuery);
}
function affectAnimaux(numeroChambre) {
    (function ($) {
        if (!numeroChambre) {
            numeroChambre = "";
        }
        var nbChats = $("#select_compoAnimauxChat" + numeroChambre).val();
        var nbChiens = $("#select_compoAnimauxChien" + numeroChambre).val();
        var nbAnimaux = nbChats + nbChiens;
        var majOptions = false;
        if ($("tr.animal").length > 0) {
            majOptions = true;
        }
        $.ajax({
            type: "POST",
            url: urlAJAX,
            data: {type: "affectAnimaux", nbChats: nbChats, nbChiens: nbChiens, numeroChambre: numeroChambre},
            beforeSend: function () {
                affMsgAttenteParDessusInDiv("div_recapPrix", "recapPrix", txtAttente);
            },
            success: function (result) {
                var tabResult = XMLToArray(result);
                if (tabResult.code == errDossierNull) {
                    retourEtape1(tabResult.msg);
                }
                else if (tabResult.errTechnq) {
                    afficheMsgErrTechnq(tabResult.msg, tabResult.titre, tabResult.ident, true);
                }
                else {
                    if (tabResult.code == "KO") {
                        $("#div_recapInfosEtPrix").hide();
                    }
                    else {
                        $("#div_recapInfosEtPrix").show();
                        if (majOptions) {
                            affectOptions();
                        }
                        if ($("#div_uneEtapeAnimaux")) {
                            $("#div_uneEtapeAnimaux").find(".inpt_validEtape").val("Oui");
                            $("#div_uneEtapeAnimaux").find(".p_recapAnimaux").html(tabResult.msg);
                            $("#div_recapOptionsAnimaux").html(tabResult.options);
                            if (nbAnimaux > 0) {
                                $("#div_recapOptionsAnimaux").show();
                            } else {
                                $("#div_recapOptionsAnimaux").hide();
                            }
                            $("#div_recapOptionsAnimaux > table > tbody > tr:last").addClass("last");
                        }
                        if ($("#div_uneEtapeAnimaux" + numeroChambre)) {
                            $("#div_uneEtapeAnimaux" + numeroChambre).find(".inpt_validEtape").val("Oui");
                            $("#div_uneEtapeAnimaux" + numeroChambre).find(".p_recapAnimaux").html(tabResult.msg);
                        }
                    }
                    $("#div_recapInfos").html(tabResult.recapInfos);
                }
                effaceMsgAttenteParDessus("recapPrix");
            }
        });
    })(jQuery);
}
function affectAssurance(objParams) {
    var params = objParams || {};
    params.type = "affectAssurance";
    (function ($) {
        var choixAssurance = $("input:radio[name=assur]:checked").val();
        if (typeof(choixAssurance) != 'undefined') {
            params.choixAssur = choixAssurance;
        }
        $.ajax({
            type: "POST", url: urlAJAX, data: params, beforeSend: function () {
                affMsgAttenteParDessusInDiv("div_recapPrix", "recapPrix", txtAttente);
            }, success: function (result) {
                var tabResult = XMLToArray(result);
                if (tabResult.code == errDossierNull) {
                    retourEtape1(tabResult.msg);
                }
                else if (tabResult.errTechnq) {
                    afficheMsgErrTechnq(tabResult.msg, tabResult.titre, tabResult.ident, true);
                }
                else {
                    if (tabResult.code == "OK") {
                        if (tabResult.recapPrix) {
                            $("#div_recapPrix").html(tabResult.recapPrix);
                        }
                        else {
                            afficheEffaceRecapPrix(tabResult);
                            $("#div_recapInfosEtPrix").show();
                        }
                    }
                    else if (tabResult.msg == "datesNull") {
                        $("#div_recapInfosEtPrix").hide();
                    }
                    $("#div_recapInfos").html(tabResult.recapInfos);
                }
                effaceMsgAttenteParDessus("recapPrix");
            }
        });
    })(jQuery);
}
function affectOptions() {
    (function ($) {
        var tabOptions = new Array();
        var i = 0;
        $("#div_uneEtape_optionsSuppl .option, #div_infosOptionsAnimaux .option").each(function () {
            if ($(this).find("select:not(.select_dureeForOption)").val() > 0 || $(this).is(".obligatoire")) {
                var numOption;
                var nbAdultes;
                var nbEnfants;
                if ($(this).is(".animal:visible")) {
                    numOption = $(this).attr("data-num");
                    nbAdultes = $(this).find("select.select_optionAnimaux").val();
                    if (nbAdultes == undefined)
                        nbAdultes = $(this).find("input.inpt_optionAnimaux").val();
                    var nbAnimaux = (parseInt($("#select_compoAnimauxChat").val()) + parseInt($("#select_compoAnimauxChien").val()));
                    if (nbAnimaux == 0) {
                        nbAdultes = 0;
                    }
                    if (nbAdultes > 0) {
                        tabOptions[i] = new Array(numOption, nbAdultes, nbEnfants);
                    }
                }
                else if ($(this).is(":not(.animal):visible")) {
                    numOption = $(this).attr("data-num");
                    if ($(this).is(".adulte")) {
                        nbAdultes = $(this).find("select.select_optionAdultes").val();
                        if (nbAdultes == undefined)
                            nbAdultes = $(this).find("input.inpt_optionAdultes").val();
                        if ($(this).next().find("input").attr("checked") == "checked") {
                            nbEnfants = $(this).next().find("select.select_optionEnfants").val();
                            if (nbEnfants == undefined)
                                nbEnfants = $(this).next().find("input.inpt_optionEnfants").val();
                        }
                        else {
                            nbEnfants = 0;
                        }
                    }
                    else if ($(this).is(".enfant")) {
                        nbEnfants = $(this).find("select.select_optionEnfants").val();
                        if (nbEnfants == undefined)
                            nbEnfants = $(this).find("input.inpt_optionEnfants").val();
                        if ($(this).prev().find("input").attr("checked") == "checked") {
                            i--;
                            nbAdultes = $(this).prev().find("select.select_optionAdultes").val();
                            if (nbAdultes == undefined)
                                nbAdultes = $(this).prev().find("input.inpt_optionAdultes").val();
                        }
                        else {
                            nbAdultes = 0;
                        }
                    }
                    else {
                        nbAdultes = $(this).find("select.select_optionAdultes").val();
                        if (nbAdultes == undefined) {
                            nbAdultes = $(this).find("select.select_optionGroupe").val();
                        }
                        if (nbAdultes == undefined) {
                            nbAdultes = $(this).find("input.inpt_optionAdultes").val();
                        }
                    }
                    var duree = '';
                    if ($(this).find('select.select_dureeForOption').length > 0) {
                        duree = $(this).find('select.select_dureeForOption').val();
                    }
                    tabOptions[i] = new Array(numOption, nbAdultes, nbEnfants, duree);
                }
                i++;
            }
        });
        $.ajax({
            type: "POST", url: urlAJAX, data: {type: "affectOptions", tabOptions: tabOptions}, beforeSend: function () {
                affMsgAttenteParDessusInDiv("div_recapPrix", "recapPrix", txtAttente);
            }, success: function (result) {
                var tabResult = XMLToArray(result);
                if (tabResult.code == errDossierNull) {
                    retourEtape1(tabResult.msg);
                }
                else if (tabResult.errTechnq) {
                    afficheMsgErrTechnq(tabResult.msg, tabResult.titre, tabResult.ident, true);
                }
                else {
                    if (tabResult.code == "OK") {
                        afficheEffaceRecapPrix(tabResult);
                        if (tabResult.tabTarifs)
                            afficheEffaceTarifsOptions(tabResult.tabTarifs);
                    }
                }
                effaceMsgAttenteParDessus("recapPrix");
            }
        });
    })(jQuery);
}
function affectOptionsChambre() {
    (function ($) {
        var tabOptions = new Array();
        var i = 0;
        $(".optionChambre").each(function () {
            if ($(this).find("select").val() > 0 || $(this).is(".obligatoire") || $(this).find("select").length > 1) {
                var numOption = $(this).attr("numOption");
                var numChambre = $(this).attr("numChambre");
                var nbAdultes = $(this).find(".select_optionChambre").val();
                var nbEnfants = $(this).find(".select_optionChambre_enfants").val();
                if (nbEnfants > 0) {
                    nbAdultes = nbAdultes + '-' + nbEnfants;
                }
                var duree = '';
                if ($(this).find(".select_dureeForOption").length > 0) {
                    duree = $(this).find(".select_dureeForOption").val();
                }
                if (nbAdultes) {
                    tabOptions[i] = new Array(numChambre, numOption, nbAdultes, duree);
                }
                i++;
            }
        });
        $.ajax({
            type: "POST",
            url: urlAJAX,
            data: {type: "affectOptionsChambre", tabOptions: tabOptions},
            beforeSend: function () {
            },
            success: function (result) {
                var tabResult = XMLToArray(result);
                if (tabResult.code == errDossierNull) {
                    retourEtape1(tabResult.msg);
                }
                else if (tabResult.errTechnq) {
                    afficheMsgErrTechnq(tabResult.msg, tabResult.titre, tabResult.ident, true);
                }
                else {
                    afficheEffaceRecapPrix(tabResult);
                }
            }
        });
    })(jQuery);
}
function afficheEffaceTarifsOptions(tabTarifs) {
    (function ($) {
        $(".td_prixOption").html("");
        $("tr.option").each(function () {
            var numOption = $(this).attr("data-num");
            for (var i = 0; i < tabTarifs.length; i++) {
                if (numOption == tabTarifs[i].noTarif) {
                    $(this).find("td.td_prixOption").html(tabTarifs[i].prix + " \u20ac");
                    break;
                }
            }
        });
    })(jQuery);
}
function etapesValid() {
    var retour = true;
    (function ($) {
        var replaceOK = false;
        $("#p_msgErreurs").html("");
        verifNbPax();
        if ($('.divUneRubriqueCanevas.canevasObligatoire').length > 0) {
            verifQteCanevasOblig();
        }
        if (!verifChoixHeureVoiture()) {
            retour = false;
        }
        if (!verifMontantNullResaBureau()) {
            retour = false;
        }
        retour = verifErreurAjaxEtape1();
        $(".inpt_validEtape").each(function () {
            if ($(this).val() == "Non" || $(this).val() == undefined) {
                var message = $(this).parents(".div_uneEtape").find(".sp_msgErreur").text();
                message = "- " + message;
                if ($("#div_msgErreurs:visible").length == 0) {
                    $("#p_msgErreurs").html(message);
                    $("#div_msgErreurs").show();
                }
                else {
                    $("#p_msgErreurs").append("<br />");
                    $("#p_msgErreurs").append(message);
                }
                $(this).parents(".div_uneEtape").addClass('div_uneEtapeAValider');
                if (!replaceOK) {
                    document.location = "#div_msgErreurs";
                    replaceOK = true;
                }
                retour = false;
            }
        });
    })(jQuery);
    return retour;
}
function initEtape2() {
    (function ($) {
        $(document).ready(function () {
            idSession = getIdSessionInHtml();
        });
        initBtnsFooter();
        majNumEtapes();
        var tabAValider = [];
        if (estResaBureauProp()) {
            tabAValider = getTabChampAValider_bureau();
        } else {
            tabAValider = getTabChampAValider();
        }
        $("#div_recupMdp").dialog({autoOpen: false, height: 150, width: 300, modal: true});
        $("#inpt_dejaClientMail, #inpt_dejaClientPassword").focus(function () {
            $(this).val("");
            $("#div_dejaClientMsgErreur").hide("slow");
        });
        $("#a_dejaClientValide").click(function () {
            var mail = $("#inpt_dejaClientMail").val();
            var mdp = $("#inpt_dejaClientPassword").val();
            $.ajax({
                type: "POST",
                url: urlAJAX,
                data: {type: "verifDejaClient", mail: mail, mdp: mdp},
                success: function (result) {
                    var tabResult = XMLToArray(result);
                    if (tabResult.code == errDossierNull) {
                        retourEtape1(tabResult.msg);
                    }
                    else if (tabResult.errTechnq) {
                        afficheMsgErrTechnq(tabResult.msg, tabResult.titre, tabResult.ident, true);
                    }
                    else {
                        if (tabResult.code == "OK") {
                            if (tabResult.effaceAcompte == "OK")
                                $(".tr_prixAcompte").hide(); else
                                $(".tr_prixAcompte").show();
                            $("#div_uneEtape_nouveauClient").hide("slow");
                            $("#div_uneEtape_dejaClient").html(tabResult.msg);
                            $('#form_dejaClient').append("<input type='hidden' name='pasDeSaisie' value='1'/>");
                            $("#form_nouveauClient").validationEngine("hide");
                            $("input:hidden[name=inpt_dejaClient]").remove();
                        }
                        else {
                            $("#div_dejaClientMsgErreurContent").html("<p>" + tabResult.msg + "</p>");
                            $("#div_dejaClientMsgErreur").show("slow");
                        }
                    }
                }
            });
        });
        $("#inpt_dejaClientPassword").keyup(function (event) {
            if (event.keyCode == 13) {
                $("#a_dejaClientValide").click();
            }
        });
        $("#a_btnModifierInfosClient").live("click", function () {
            document.location.reload();
            return;
            $.ajax({
                type: "POST", url: urlAJAX, data: {type: "recupFormulaireSaisieClient"}, beforeSend: function () {
                }, success: function (result) {
                    var tabResult = XMLToArray(result);
                    if (tabResult == errDossierNull) {
                        retourEtape1(tabResult.msg);
                    }
                    else if (tabResult.errTechnq) {
                        afficheMsgErrTechnq(tabResult.msg, tabResult.titre, tabResult.ident, true);
                    }
                    else {
                        $("#form_dejaClient").html(tabResult.msg);
                    }
                }
            });
        });
        $("#div_btnConfirmer > a:not(.a_btnAttenteConfirm), #div_btnConfirmer_2 > a:not(.a_btnAttenteConfirm)").click(function () {
            $(this).hide();
            $(".a_btnAttenteConfirm").show();
            if ($("#div_adresseClient:visible").length > 0) {
                tabAValider = [];
            }
            if ($('#div_saisieParticipantsCongres').length > 0) {
                var tabParticipants = new Array();
                var nom;
                var prenom;
                var i = 0;
                $('.div_unParticipant').each(function () {
                    nom = $(this).find('.nomParticipant').val();
                    prenom = $(this).find('.prenomParticipant').val();
                    tabParticipants[i] = new Array(nom, prenom);
                    i++;
                });
                $.ajax({
                    type: "POST",
                    url: urlAJAX,
                    data: {type: "setParticpantsCongres", tabParticipants: tabParticipants},
                    beforeSend: function () {
                    }
                });
            }
            if ($(this).parent().is('#div_btnConfirmer_2')) {
                var urlHref = "etape" + $('#div_btnConfirmer_2').attr('data-idPageNext') + ".php";
            } else {
                var urlHref = "etape" + $('#div_btnConfirmer').attr('data-idPageNext') + ".php";
            }
            if (location.search.indexOf("PHPSESSID") > -1) {
                urlHref += location.search;
            } else {
                urlHref += location.search + "&" + idSession;
            }
            if ($("input:hidden[name=inpt_dejaClient]").length > 0) {
                location.href = urlHref;
            }
            else if (LiveValidation.massValidate(tabAValider)) {
                var tabInfos = new Array();
                if ($("#form_nouveauClient:visible").length > 0) {
                    $(".div_saisieClient:visible").each(function () {
                        var objs = $(this).children(":not(label)");
                        var id, valeur;
                        objs.each(function () {
                            var estInput = $(this).attr('name') || false;
                            if (estInput) {
                                id = $(this).attr("name");
                                valeur = $(this).val() || '';
                            }
                        })
                        tabInfos.push(new Array(id, valeur));
                    });
                    if ($("#div_dateNaissanceClient").length > 0) {
                        var jour = $("#select_jourNaissanceClient").val();
                        var mois = $("#select_moisNaissanceClient").val();
                        var annee = $("#select_anneeNaissanceClient").val();
                        var dateNaissance = jour + "-" + mois + "-" + annee;
                        tabInfos.push(new Array("dateNaissance", dateNaissance));
                    }
                    id = $("#div_saisieClientOffres").children(":not(label)").attr("name");
                    valeur = $("#div_saisieClientOffres").children(":not(label)").attr("checked");
                    tabInfos.push(new Array(id, valeur));
                    id = $("#div_saisieClientBackofficeParMail").children(":not(label)").attr("name");
                    valeur = $("#div_saisieClientBackofficeParMail").children(":not(label)").attr("checked");
                    tabInfos.push(new Array(id, valeur));
                    $.ajax({
                        type: "POST",
                        url: urlAJAX,
                        data: {type: "enregistreClient", tabInfos: tabInfos},
                        beforeSend: function () {
                        },
                        success: function (result) {
                            eval("var tabResult=" + result);
                            if (tabResult.code == errDossierNull) {
                                retourEtape1(tabResult.msg);
                            }
                            else if (tabResult.errTechnq) {
                                afficheMsgErrTechnq(tabResult.msg, tabResult.titre, tabResult.ident, true);
                            }
                            else {
                                if (tabResult.code == "OK") {
                                    location.href = urlHref;
                                }
                                else {
                                }
                            }
                        }
                    });
                }
                else {
                    $(".div_saisieClient:visible").each(function () {
                        var id = $(this).children(":not(label)").attr("name");
                        var valeur = $(this).children(":not(label)").val();
                        tabInfos.push(new Array(id, valeur));
                    });
                    if ($("#div_saisieClientOffres:visible").length > 0) {
                        id = $("#div_saisieClientOffres:visible").children(":not(label)").attr("name");
                        valeur = $("#div_saisieClientOffres:visible").children(":not(label)").attr("checked");
                        tabInfos.push(new Array(id, valeur));
                    }
                    $.ajax({
                        type: "POST",
                        url: urlAJAX,
                        data: {type: "enregistreClient", tabInfos: tabInfos},
                        beforeSend: function () {
                        },
                        success: function (result) {
                            eval("var tabResult=" + result);
                            if (tabResult.code == errDossierNull) {
                                retourEtape1(tabResult.msg);
                            }
                            else if (tabResult.errTechnq) {
                                afficheMsgErrTechnq(tabResult.msg, tabResult.titre, tabResult.ident, true);
                            }
                            else {
                                if (tabResult.code == "OK") {
                                    location.href = urlHref;
                                }
                                else {
                                }
                            }
                        }
                    });
                }
            }
            else {
                if (typeof(dataLayer) != 'undefined') {
                    dataLayer.push({'form_error': true, 'event': 'form_error'});
                    var champsInvalides = '';
                    $('.LV_invalid_field').each(function () {
                        champsInvalides += $(this).attr('name') + ', ';
                    });
                    champsInvalides = champsInvalides.substring(0, champsInvalides.length - 2);
                    dataLayer.push({'form_error_field': champsInvalides, 'event': 'form_error'});
                }
                $(".a_btnAttenteConfirm").hide();
                $(this).show();
                $("#div_msgErreursInfosClient").show();
                document.location = "#div_msgErreursInfosClient";
            }
        });
        $("#a_dejaClientMotDePasseOublie").click(function () {
            $("#div_recupMdpContent").show();
            $("#div_recupMdpMsgRetour").hide();
            $("#inpt_mail").val("");
            $("#div_recupMdp").dialog("option", "buttons", {
                "Retrouver": function () {
                    var mail = $("#inpt_mail").val();
                    $.ajax({
                        type: "POST", url: urlAJAX, data: {type: "recupMdp", mail: mail}, beforeSend: function () {
                        }, success: function (result) {
                            eval("var tabResult=" + result);
                            if (tabResult.code == errDossierNull) {
                                retourEtape1(tabResult.msg);
                            }
                            else if (tabResult.errTechnq) {
                                afficheMsgErrTechnq(tabResult.msg, tabResult.titre, tabResult.ident, true);
                            }
                            else {
                                $("#div_recupMdp").dialog("option", "buttons", {
                                    "OK": function () {
                                        $(this).dialog("close");
                                    }
                                });
                                $("#div_recupMdpContent").hide();
                                $("#div_recupMdpMsgRetour").text(tabResult.msg).show();
                            }
                        }
                    });
                }, "Annuler": function () {
                    $(this).dialog("close");
                }
            });
            $("#div_recupMdp").dialog("open");
        });
        $('#sp_deconnecteGoogle').click(function () {
            var token = $(this).attr('data-token');
            deconnecteGoogle(token);
        });
        $('#div_btnConnexionFacebook').click(function () {
            connexionFacebook();
        });
        autocompleteurCpVille($('#inpt_cpClient'), $('#inpt_villeClient'));
    })(jQuery);
}
function initEtape2_agence() {
    (function ($) {
        $(document).ready(function () {
            idSession = getIdSessionInHtml();
        });
        initBtnsFooter();
        var tabAValider = [];
        var nom = new LiveValidation("inpt_nomClient", {validMessage: $("#inpt_msgOk").val()});
        nom.add(Validate.Presence, {failureMessage: $("#inpt_msgVide").val()});
        tabAValider.push(nom);
        $("#div_btnConfirmer > a:not(.a_btnAttenteConfirm)").click(function () {
            $(this).hide();
            $(".a_btnAttenteConfirm").show();
            var urlHref = "etape" + $('#div_btnConfirmer').attr('data-idPageNext') + ".php";
            if (location.search.indexOf("PHPSESSID") > -1) {
                urlHref += location.search;
            } else {
                urlHref += location.search + "&" + idSession;
            }
            if (LiveValidation.massValidate(tabAValider)) {
                var tabInfos = new Array();
                $(".div_saisieClient:visible").each(function () {
                    var objs = $(this).children(":not(label)");
                    var id, valeur;
                    objs.each(function () {
                        var estInput = $(this).attr('name') || false;
                        if (estInput) {
                            id = $(this).attr("name");
                            valeur = $(this).val();
                        }
                    })
                    tabInfos.push(new Array(id, valeur));
                });
                $.ajax({
                    type: "POST",
                    url: urlAJAX,
                    data: {type: "enregistreClient_agence", tabInfos: tabInfos},
                    success: function (result) {
                        eval("var tabResult=" + result);
                        if (tabResult.code == errDossierNull) {
                            retourEtape1(tabResult.msg);
                        }
                        else if (tabResult.errTechnq) {
                            afficheMsgErrTechnq(tabResult.msg, tabResult.titre, tabResult.ident, true);
                        }
                        else {
                            if (tabResult.code == "OK") {
                                location.href = urlHref;
                            }
                            else {
                            }
                        }
                    }
                });
            }
            else {
                $(".a_btnAttenteConfirm").hide();
                $(this).show();
                $("#div_msgErreursInfosClient").show();
                document.location = "#div_msgErreursInfosClient";
            }
        });
        autocompleteurCpVille($('#inpt_cpClient'), $('#inpt_villeClient'));
    })(jQuery);
}
function initEtape2_bureau() {
    (function ($) {
        $(document).ready(function () {
            idSession = getIdSessionInHtml();
        });
        initBtnsFooter();
        initModifPrixResaBureau();
        initSaisieOccupantsResaBureau();
        var tabAValider = getTabChampAValider_bureau();
        $("#div_btnConfirmer > a:not(.a_btnAttenteConfirm)").click(function () {
            $(this).hide();
            $(".a_btnAttenteConfirm").show();
            var urlHref = "etape" + $('#div_btnConfirmer').attr('data-idPageNext') + ".php";
            if (location.search.indexOf("PHPSESSID") > -1) {
                urlHref += location.search;
            } else {
                urlHref += location.search + "&" + idSession;
            }
            if (LiveValidation.massValidate(tabAValider)) {
                var tabInfos = new Array();
                $(".div_saisieClient:visible, #div_saisieClientPassword").each(function () {
                    var objs = $(this).children(":not(label)");
                    var id, valeur;
                    objs.each(function () {
                        var estInput = $(this).attr('name') || false;
                        if (estInput) {
                            id = $(this).attr("name");
                            valeur = $(this).val();
                        }
                    })
                    tabInfos.push(new Array(id, valeur));
                });
                $(".div_saisieClientChecks:visible").each(function () {
                    id = $(this).children(":not(label)").attr("name");
                    valeur = $(this).children(":not(label)").attr("checked");
                    tabInfos.push(new Array(id, valeur));
                });
                $.ajax({
                    type: "POST",
                    url: urlAJAX,
                    data: {type: "enregistreClient", tabInfos: tabInfos},
                    beforeSend: function () {
                    },
                    success: function (result) {
                        eval("var tabResult=" + result);
                        if (tabResult.code == errDossierNull) {
                            retourEtape1(tabResult.msg);
                        }
                        else if (tabResult.errTechnq) {
                            afficheMsgErrTechnq(tabResult.msg, tabResult.titre, tabResult.ident, true);
                        }
                        else {
                            if (tabResult.code == "OK") {
                                location.href = urlHref;
                            }
                            else {
                            }
                        }
                    }
                });
            } else {
                $(".a_btnAttenteConfirm").hide();
                $(this).show();
                $("#div_msgErreursInfosClient").show();
                document.location = "#div_msgErreursInfosClient";
            }
        });
        $('.div_saisieClient input').change(function () {
            checkChampsImportants();
        });
        checkChampsImportants();
        autocompleteurCpVille($('#inpt_cpClient'), $('#inpt_villeClient'));
        initAutocompleteClientsExistants(false);
    })(jQuery);
}
function checkChampsImportants() {
    (function ($) {
        if ($('#inpt_adresse1Client').val() == '') {
            $('#div_msgInfosChampsSaisis p.adresse').show();
        } else {
            $('#div_msgInfosChampsSaisis p.adresse').hide();
        }
        if ($('#inpt_telDomClient').val() == '') {
            $('#div_msgInfosChampsSaisis p.tel').show();
        } else {
            $('#div_msgInfosChampsSaisis p.tel').hide();
        }
        if ($('#inpt_mailClient').val() == '') {
            $('#div_msgInfosChampsSaisis p.mail').show();
        } else {
            $('#div_msgInfosChampsSaisis p.mail').hide();
        }
        if ($('#div_msgInfosChampsSaisis .p_msgInfosChampsSaisis:visible').length == 0) {
            $('#div_msgInfosChampsSaisis').hide();
        } else {
            $('#div_msgInfosChampsSaisis').show();
        }
    })(jQuery);
}
function validFormulaire() {
    (function ($) {
        var tabAValider = [];
        if (estResaBureauGestloc() || estResaBureauProp()) {
            tabAValider = getTabChampAValider_bureau();
        } else {
            tabAValider = getTabChampAValider();
        }
        LiveValidation.massValidate(tabAValider);
    })(jQuery);
}
function getTabChampAValider() {
    var retour = [];
    (function ($) {
        var nom = new LiveValidation("inpt_nomClient", {validMessage: $("#inpt_msgOk").val()});
        nom.add(Validate.Presence, {failureMessage: $("#inpt_msgVide").val()});
        retour.push(nom);
        var prenom = new LiveValidation("inpt_prenomClient", {validMessage: $("#inpt_msgOk").val()});
        prenom.add(Validate.Presence, {failureMessage: $("#inpt_msgVide").val()});
        retour.push(prenom);
        var adresse = new LiveValidation("inpt_adresse1Client", {validMessage: $("#inpt_msgOk").val()});
        adresse.add(Validate.Presence, {failureMessage: $("#inpt_msgVide").val()});
        retour.push(adresse);
        var cp = new LiveValidation("inpt_cpClient", {validMessage: $("#inpt_msgOk").val()});
        cp.add(Validate.Presence, {failureMessage: $("#inpt_msgVide").val()});
        retour.push(cp);
        var ville = new LiveValidation("inpt_villeClient", {validMessage: $("#inpt_msgOk").val()});
        ville.add(Validate.Presence, {failureMessage: $("#inpt_msgVide").val()});
        retour.push(ville);
        var tel = new LiveValidation("inpt_telDomClient", {validMessage: $("#inpt_msgOk").val()});
        tel.add(Validate.Presence, {failureMessage: $("#inpt_msgVide").val()});
        if ($('#inpt_telDomClient').attr('data-typeTel') == 'portable') {
            tel.add(Validate.Format, {
                pattern: /(^0[6-7][\s]?([0-9]{2}[\s]?){3}[0-9]{2}$|^00[0-9,\s]+[0-9]$)/,
                failureMessage: $("#inpt_msgTelPortable").val()
            });
        }
        else {
            tel.add(Validate.Format, {
                pattern: /(^0[1-9][\s]?([0-9]{2}[\s]?){3}[0-9]{2}$|^00[0-9,\s]+[0-9]$)/,
                failureMessage: $("#inpt_msgTelChiffres").val()
            });
        }
        tel.add(Validate.Length, {minimum: 6, tooShortMessage: $("#inpt_msgTelCourt").val()});
        tel.add(Validate.Length, {maximum: 14, tooLongMessage: $('#inpt_msgTelLong').val()});
        retour.push(tel);
        var tel2 = new LiveValidation("inpt_telBurClient", {validMessage: $("#inpt_msgOk").val()});
        tel2.add(Validate.Format, {
            pattern: /(^0[1-9][\s]?([0-9]{2}[\s]?){3}[0-9]{2}$|^00[0-9,\s]+[0-9]$)/,
            notANumberMessage: $("#inpt_msgTelChiffres").val()
        });
        tel2.add(Validate.Length, {minimum: 6, tooShortMessage: $("#inpt_msgTelCourt").val()});
        tel2.add(Validate.Length, {maximum: 14, tooLongMessage: $('#inpt_msgTelLong').val()});
        retour.push(tel2);
        var email = new LiveValidation("inpt_mailClient", {validMessage: $("#inpt_msgOk").val(), onlyOnBlur: true});
        var obligatoire = true;
        if ($('#div_saisieClientEmail').find('span.etoile').length === 0) {
            obligatoire = false;
        }
        addValidateOnLiveValidationEmail(email, undefined, obligatoire, $("#inpt_msgMailNonValide").val());
        retour.push(email);
        if ($('#inpt_confirmMailClient').length > 0) {
            var emailConfirm = new LiveValidation("inpt_confirmMailClient", {validMessage: $("#inpt_msgOk").val()});
            emailConfirm.add(Validate.Confirmation, {
                match: "inpt_mailClient",
                failureMessage: $("#inpt_msgCorresMails").val()
            });
            retour.push(emailConfirm);
        }
        if ($("#inpt_mdpClient").is(":visible")) {
            var mdp = new LiveValidation("inpt_mdpClient", {validMessage: $("#inpt_msgOk").val()});
            mdp.add(Validate.Format, {
                pattern: /^[0-9a-zA-Z-_]+$/,
                failureMessage: $("#inpt_msgSeulementChiffresLettres").val()
            });
            mdp.add(Validate.Length, {minimum: 4, tooShortMessage: $("#inpt_msgNbCar").val()});
            retour.push(mdp);
        }
        if ($('#modeResaPVTrue').length > 0 && $('#inpt_commentaireDossier').length > 0) {
            var commentaire = new LiveValidation("inpt_commentaireDossier", {validMessage: $("#inpt_msgOk").val()});
            commentaire.add(Validate.Length, {maximum: 200, tooLongMessage: $("#inpt_msgCommentaireNonValide").val()});
            retour.push(commentaire);
            if ($('#inpt_commentaireDossierPourCentrale').length > 0) {
                var commentaireCentrale = new LiveValidation("inpt_commentaireDossierPourCentrale", {validMessage: $("#inpt_msgOk").val()});
                commentaireCentrale.add(Validate.Length, {
                    maximum: parseInt($('#inpt_commentaireDossierPourCentrale').attr('data-longueurMax')),
                    tooLongMessage: $("#inpt_msgCommentaireNonValide").val()
                });
                retour.push(commentaireCentrale);
            }
        }
        if ($('#modeResaPVTrue').length == 0 && $('#inpt_modeResaPROP').length == 0) {
            email.add(Validate.Presence, {failureMessage: $("#inpt_msgVide").val()});
            if (emailConfirm) {
                emailConfirm.add(Validate.Presence, {failureMessage: $("#inpt_msgVide").val()});
            }
        }
    })(jQuery);
    return retour;
}
function getTabChampAValider_bureau() {
    var retour = [];
    (function ($) {
        var nom = new LiveValidation("inpt_nomClient", {validMessage: $("#inpt_msgOk").val()});
        nom.add(Validate.Presence, {failureMessage: $("#inpt_msgVide").val()});
        retour.push(nom);
        var prenom = new LiveValidation("inpt_prenomClient", {validMessage: $("#inpt_msgOk").val()});
        retour.push(prenom);
        $("#inpt_telDomClient").change(function () {
            $("#inpt_telDomClient").val($("#inpt_telDomClient").val().trim());
        });
        $("#inpt_telBurClient").change(function () {
            $("#inpt_telBurClient").val($("#inpt_telBurClient").val().trim());
        });
        var tel = new LiveValidation("inpt_telDomClient", {validMessage: $("#inpt_msgOk").val(), onlyOnSubmit: true});
        tel.add(Validate.Format, {
            pattern: /(^0[1-9][\s]?([0-9]{2}[\s]?){3}[0-9]{2}$|^00[0-9,\s]+[0-9]$)/,
            failureMessage: "Numéro de téléphone non valide (international : commence par 00)"
        });
        tel.add(Validate.Length, {maximum: 14, tooLongMessage: $('#inpt_msgTelLong').val()});
        retour.push(tel);
        var tel2 = new LiveValidation("inpt_telBurClient", {validMessage: $("#inpt_msgOk").val(), onlyOnSubmit: true});
        tel2.add(Validate.Format, {
            pattern: /(^0[1-9][\s]?([0-9]{2}[\s]?){3}[0-9]{2}$|^00[0-9,\s]+[0-9]$)/,
            failureMessage: "Numéro de téléphone non valide (international : commence par 00)"
        });
        tel2.add(Validate.Length, {maximum: 14, tooLongMessage: $('#inpt_msgTelLong').val()});
        retour.push(tel2);
        var email = new LiveValidation("inpt_mailClient", {validMessage: $("#inpt_msgOk").val(), onlyOnBlur: true});
        addValidateOnLiveValidationEmail(email, undefined, false, $("#inpt_msgMailNonValide").val());
        retour.push(email);
        if ($('#inpt_mailClientPlus').length > 0) {
            var emailPlus = new LiveValidation("inpt_mailClientPlus", {
                validMessage: $("#inpt_msgOk").val(),
                onlyOnBlur: true
            });
            addValidateOnLiveValidationEmail(emailPlus, undefined, false, $("#inpt_msgMailNonValide").val());
            retour.push(emailPlus);
        }
        var commentaire = new LiveValidation("inpt_commentaireDossier", {validMessage: $("#inpt_msgOk").val()});
        commentaire.add(Validate.Length, {maximum: 200, tooLongMessage: $("#inpt_msgCommentaireNonValide").val()});
        retour.push(commentaire);
        if ($('#inpt_commentaireDossierPourCentrale').length > 0) {
            var commentaireCentrale = new LiveValidation("inpt_commentaireDossierPourCentrale", {validMessage: $("#inpt_msgOk").val()});
            commentaireCentrale.add(Validate.Length, {
                maximum: parseInt($('#inpt_commentaireDossierPourCentrale').attr('data-longueurMax')),
                tooLongMessage: $("#inpt_msgCommentaireNonValide").val()
            });
            retour.push(commentaireCentrale);
        }
    })(jQuery);
    return retour;
}
function verifSaisieDateNaissance() {
    (function ($) {
        var ok = $("#inpt_msgOk").val();
        var err = $("#inpt_msgVide").val();
        var xhtml = "";
        $("#div_dateNaissanceClient > span").remove();
        if ($("#select_anneeNaissanceClient").val() != '0' && $("#select_moisNaissanceClient").val() != '0' && $("#select_jourNaissanceClient").val() != '0') {
            xhtml = "<span class='LV_validation_message LV_valid'>" + ok + "</span>";
        }
        else {
            xhtml = "<span class='LV_validation_message LV_invalid'>" + err + "</span>";
        }
        $("#div_dateNaissanceClient").append(xhtml);
    })(jQuery);
}
function initEtape3() {
    (function ($) {
        $(document).ready(function () {
            idSession = getIdSessionInHtml();
        });
        initBtnsFooter();
        initModifPrixResaBureau();
        $.datepicker.setDefaults($.datepicker.regional[initLangueForDatePicker()]);
        $('#inpt_nouvelleDateLimite').datepicker();
        if ($('#div_valideDocsFiche').length > 0) {
            $("#inpt_valideDocFiche").click(function () {
                $("#div_msgErreursDocs").hide();
                if ($(this).attr("checked") == "checked" && $("#inpt_valideDocCgv").attr("checked") == "checked" && $("#inpt_valideDocCga").attr("checked") == "checked")
                    etapeCourante($("#div_uneEtape_validationReservation"), false);
            });
        }
        $("#div_recapHeberVoirFiche").click(function () {
            $("#inpt_valideDocFiche").checked = true;
            $("#inpt_valideDocFiche").attr("checked", true);
        });
        $("#a_valideFiche").click(function () {
            window.open($("#a_valideFiche").attr("url"), "", "toolbar=no,top=50,left=50,location=no,directories=no,status=no,menubar=yes,scrollbars=yes,resizable=yes,width=600,height=700");
            if ($("#inpt_valideDocFiche").attr("checked") != "checked") {
                $("#inpt_valideDocFiche").checked = true;
                $("#inpt_valideDocFiche").attr("checked", true);
            }
        });
        $("#a_valideCGV").click(function () {
            $("#inpt_valideDocCgv").checked = true;
            $("#inpt_valideDocCgv").attr("checked", true);
        });
        $("#a_valideCGA").click(function () {
            $("#inpt_valideDocCga").checked = true;
            $("#inpt_valideDocCga").attr("checked", true);
        });
        $(".inpt_valideDoc").click(function () {
            $("#div_msgErreursDocs").hide();
            if ($("#inpt_valideDocFiche").attr("checked") == "checked" && $("#inpt_valideDocCgv").attr("checked") == "checked")
                if ($("#inpt_valideDocCga").length == 0 || ($("#inpt_valideDocCga").length > 0 && $("#inpt_valideDocCga").attr("checked") == "checked"))
                    etapeCourante($("#div_uneEtape_validationReservation"), false);
        });
        $("#a_btChoixPaiementOption, #a_btChoixResaLD").click(function () {
            $(".a_btChoixPaiement").hide();
            $(".a_btnAttenteConfirm").show();
            $('.errSaisie').removeClass('errSaisie');
            $('#div_btnsResaProp_LD .div_msgErreurs, #div_btnsResaProp_LD .div_msgErreurs p, #div_btnsResaProp_LD .sp_msgErreur').hide();
            var typeResaProp = '';
            var etatDossierIntention = '';
            var nouveauFraisDossier;
            var montantsSaisisCorrects = true;
            var regexMontants = new RegExp('^[0-9]+\.?[0-9]{0,2}$');
            var regexDate = new RegExp('^[0-9]{2}/[0-9]{2}/[0-9]{4}$');
            if ($(this).is('.a_btChoixResaLD')) {
                typeResaProp = 'LD';
            } else if ($(this).is('.a_btnChoixCentrale')) {
                typeResaProp = 'centrale';
            }
            if ($('#inpt_modifFDResaProp:visible').length > 0) {
                nouveauFraisDossier = $('#inpt_modifFDResaProp').val();
                if (!regexMontants.test(nouveauFraisDossier)) {
                    montantsSaisisCorrects = false;
                    $('#inpt_modifFDResaProp').addClass('errSaisie');
                }
            }
            var nouvelAcompte;
            var montantPercu;
            var prixLocation;
            var tabPrixChambre = new Array();
            var prixTotal = $('#inpt_prixTotalResaProp').val();
            var prixLoc = $('#inpt_prixLocResaProp').val();
            var nouveauPrixTotal = parseFloat(prixTotal) - parseFloat(prixLoc);
            if ($('.inpt_modifPrixLocationResaProp:visible').length > 0) {
                prixLocation = $('.inpt_modifPrixLocationResaProp:visible').val();
                if (!regexMontants.test(prixLocation)) {
                    $('.sp_msgSaisieMontantErronee').show();
                    montantsSaisisCorrects = false;
                    $('.inpt_modifPrixLocationResaProp:visible').addClass('errSaisie');
                }
                else if ($('.inpt_modifPrixLocationResaProp:visible').attr('id') == 'inpt_modifPrixCentraleProp') {
                    var prixLocationReference = $('#inpt_modifPrixCentraleProp').attr('data-prixReference');
                    if (parseFloat(prixLocation) > parseFloat(prixLocationReference)) {
                        montantsSaisisCorrects = false;
                        $('.sp_msgSaisieMontantSuperieur').show();
                        $(this).addClass('errSaisie');
                    }
                }
                nouveauPrixTotal += parseFloat(prixLocation);
            }
            if ($('.inpt_modifPrixChambreResaProp:visible').length > 0 || $('.inpt_modifPrixChambreCentraleProp:visible').length > 0) {
                prixLocation = 0;
                var nbChambresModif = 0;
                var inputs = $('.inpt_modifPrixChambreResaProp:visible, .inpt_modifPrixChambreCentraleProp:visible');
                $(inputs).each(function () {
                    var numeroChambre = $(this).attr('data-numeroChambre');
                    var prixChambre = $(this).val();
                    var prixReference = $('#prixChambreCentralePropReference_' + numeroChambre).val();
                    if (!regexMontants.test(prixChambre)) {
                        montantsSaisisCorrects = false;
                        $('.sp_msgSaisieMontantErronee').show();
                        $(this).addClass('errSaisie');
                    } else if ($(this).hasClass('inpt_modifPrixChambreCentraleProp') && parseFloat(prixChambre) > parseFloat(prixReference)) {
                        montantsSaisisCorrects = false;
                        $('.sp_msgSaisieMontantSuperieur').show();
                        $(this).addClass('errSaisie');
                    }
                    else {
                        prixLocation += parseFloat(prixChambre);
                        tabPrixChambre[nbChambresModif] = {numeroChambre: numeroChambre, prixChambre: prixChambre};
                    }
                    nbChambresModif++;
                });
                nouveauPrixTotal += parseFloat(prixLocation);
            }
            if ($('#inpt_modifAcompteResaProp:visible').length > 0) {
                nouvelAcompte = $('#inpt_modifAcompteResaProp').val();
                if (!regexMontants.test(nouvelAcompte)) {
                    montantsSaisisCorrects = false;
                    $('.sp_msgSaisieMontantErronee').show();
                    $('#inpt_modifAcompteResaProp').addClass('errSaisie');
                }
                if (parseFloat(nouvelAcompte) > parseFloat(nouveauPrixTotal)) {
                    montantsSaisisCorrects = false;
                    $('#inpt_modifAcompteResaProp').addClass('errSaisie');
                    $('.sp_msgErrMontantAcomptePrixLoc').show();
                }
            }
            if ($('#inpt_modifMontantPercu:visible').length > 0) {
                montantPercu = $('#inpt_modifMontantPercu').val();
                if (!regexMontants.test(montantPercu)) {
                    montantsSaisisCorrects = false;
                    $('.sp_msgSaisieMontantErronee').show();
                    $('#inpt_modifMontantPercu').addClass('errSaisie');
                }
                if (parseFloat(montantPercu) > parseFloat(nouveauPrixTotal)) {
                    montantsSaisisCorrects = false;
                    $('#inpt_modifMontantPercu').addClass('errSaisie');
                    $('.sp_msgErrMontantPercuPrixLoc').show();
                }
            }
            if ($('#inpt_resaBureauIntention:visible').length > 0) {
                if ($('#inpt_resaBureauIntention').attr('checked') == 'checked') {
                    etatDossierIntention = 'O';
                }
            }
            var nouvelleDateLimite = '';
            if ($('#inpt_nouvelleDateLimite:visible').length > 0) {
                nouvelleDateLimite = $('#inpt_nouvelleDateLimite').val();
                if (!regexDate.test(nouvelleDateLimite)) {
                    montantsSaisisCorrects = false;
                    $('#inpt_nouvelleDateLimite').addClass('errSaisie');
                }
            }
            if (casesCochees() == true && montantsSaisisCorrects) {
                $.ajax({
                    type: "POST",
                    url: urlAJAX,
                    data: {
                        type: "affectAutrePaiement",
                        nouveauFraisDossier: nouveauFraisDossier,
                        nouvelAcompte: nouvelAcompte,
                        montantPercu: montantPercu,
                        typeResaProp: typeResaProp,
                        prixLocation: prixLocation,
                        tabPrixChambre: tabPrixChambre,
                        etatDossierIntention: etatDossierIntention,
                        nouvelleDateLimite: nouvelleDateLimite
                    },
                    beforeSend: function () {
                    },
                    success: function (result) {
                        eval("var tabResult=" + result);
                        if (tabResult.code == errDossierNull) {
                            retourEtape1(tabResult.msg);
                        }
                        else if (tabResult.errTechnq) {
                            afficheMsgErrTechnq(tabResult.msg, tabResult.titre, tabResult.ident, true);
                        }
                        else {
                            if (tabResult.code == "OK") {
                                if (location.search.indexOf("PHPSESSID") > -1) {
                                    location.href = "etape4.php" + location.search;
                                } else {
                                    location.href = "etape4.php" + location.search + "&" + idSession;
                                }
                            }
                            else {
                                alertAMalibu(tabResult.msg);
                            }
                        }
                    }
                });
            }
            else {
                $(".a_btnAttenteConfirm").hide();
                $(".a_btChoixPaiement").show();
                $('#div_btnsResaProp_centrale .div_msgErreurs, #div_btnsResaProp_centrale .div_msgErreurs p').show('fast');
                $('#div_btnsResaProp_LD .div_msgErreurs, #div_btnsResaProp_LD .div_msgErreurs p').show('fast');
            }
        });
        $("#a_btChoixPaiementReserver").click(function () {
            $(".a_btChoixPaiement").hide();
            $(".a_btnAttenteConfirm").show();
            $('#div_btnsResaProp_LD .div_msgErreurs, #div_btnsResaProp_LD .div_msgErreurs p, #div_btnsResaProp_LD .sp_msgErreur').hide();
            $('#div_btnsResaProp_centrale .div_msgErreurs, #div_btnsResaProp_centrale .div_msgErreurs p').show('fast');
            var nouveauFraisDossier = null, nouveauPrixLocation = null, tabPrixChambre = [];
            var montantsSaisisCorrects = true;
            var regexMontants = new RegExp('^[0-9]+\.?[0-9]{0,2}$');
            if ($('#inpt_modifFDResaProp').length > 0) {
                nouveauFraisDossier = $('#inpt_modifFDResaProp').val();
                if (!regexMontants.test(nouveauFraisDossier)) {
                    montantsSaisisCorrects = false;
                    $('#inpt_modifFDResaProp').addClass('errSaisie');
                    $('.sp_msgSaisieMontantErronee').show();
                }
            }
            if ($('#inpt_modifPrixCentraleProp').length > 0) {
                var prixLocationReference = $('#inpt_modifPrixCentraleProp').attr('data-prixReference');
                nouveauPrixLocation = $('#inpt_modifPrixCentraleProp').val();
                if (!regexMontants.test(nouveauPrixLocation)) {
                    $('.sp_msgSaisieMontantErronee').show();
                    montantsSaisisCorrects = false;
                    $('#inpt_modifPrixCentraleProp').addClass('errSaisie');
                }
                if (parseFloat(nouveauPrixLocation) > parseFloat(prixLocationReference)) {
                    montantsSaisisCorrects = false;
                    $('.sp_msgSaisieMontantSuperieur').show();
                    $(this).addClass('errSaisie');
                }
            }
            if ($('.inpt_modifPrixChambreCentraleProp').length > 0) {
                var nbChambresModif = 0;
                $('.inpt_modifPrixChambreCentraleProp').each(function () {
                    var numeroChambre = $(this).attr('data-numeroChambre');
                    var prixChambre = $(this).val();
                    var prixReference = $('#prixChambreCentralePropReference_' + numeroChambre).val();
                    if (!regexMontants.test(prixChambre)) {
                        montantsSaisisCorrects = false;
                        $('.sp_msgSaisieMontantErronee').show();
                        $(this).addClass('errSaisie');
                    } else if (parseFloat(prixChambre) > parseFloat(prixReference)) {
                        montantsSaisisCorrects = false;
                        $('.sp_msgSaisieMontantSuperieur').show();
                        $(this).addClass('errSaisie');
                    }
                    else {
                        tabPrixChambre[nbChambresModif] = {numeroChambre: numeroChambre, prixChambre: prixChambre};
                    }
                    nbChambresModif++;
                });
            }
            if (casesCochees() == true && montantsSaisisCorrects) {
                var params = {type: "affectPaiementCB"};
                if (nouveauPrixLocation !== null) {
                    params.prixLocation = nouveauPrixLocation;
                }
                if (nouveauFraisDossier !== null) {
                    params.nouveauFraisDossier = nouveauFraisDossier;
                }
                if (tabPrixChambre.length > 0) {
                    params.tabPrixChambre = tabPrixChambre;
                }
                $.ajax({
                    type: "POST", url: urlAJAX, data: params, beforeSend: function () {
                    }, success: function (result) {
                        eval("var tabResult=" + result);
                        if (tabResult.code == errDossierNull) {
                            retourEtape1(tabResult.msg);
                        }
                        else if (tabResult.errTechnq) {
                            afficheMsgErrTechnq(tabResult.msg, tabResult.titre, tabResult.ident, true);
                        }
                        else {
                            if (tabResult.code == "OK") {
                                $("#inpt_pbx_montant").val(tabResult.montant);
                                $("#inpt_pbx_site").val(tabResult.site);
                                $("#inpt_pbx_rang").val(tabResult.rang);
                                $("#inpt_pbx_identifiant").val(tabResult.identifiant);
                                $("#inpt_pbx_cmd").val(tabResult.reference);
                                var autorisationSeule = tabResult.autoSeule || false;
                                if (autorisationSeule) {
                                    $("#form_formPbx").append('<input type="hidden" name="PBX_AUTOSEULE" id="inputPBX_AUTOSEULE" value="O"/>');
                                }
                                $("#form_formPbx").submit();
                            }
                            else {
                                alertAMalibu(tabResult.msg);
                            }
                        }
                    }
                });
            }
            else {
                $(".a_btnAttenteConfirm").hide();
                $(".a_btChoixPaiement").show();
                $('#div_btnsResaProp_centrale .div_msgErreurs, #div_btnsResaProp_centrale .div_msgErreurs p').show('fast');
            }
        });
        $("#a_btChoixPaiementAcompte").click(function () {
            $(".a_btChoixPaiement").hide();
            $(".a_btnAttenteConfirm").show();
            if (casesCochees() == true) {
                $.ajax({
                    type: "POST",
                    url: urlAJAX,
                    data: {type: "affectPaiementCB", choixPaiement: "acompte"},
                    beforeSend: function () {
                    },
                    success: function (result) {
                        eval("var tabResult=" + result);
                        if (tabResult.code == errDossierNull) {
                            retourEtape1(tabResult.msg);
                        }
                        else if (tabResult.errTechnq) {
                            afficheMsgErrTechnq(tabResult.msg, tabResult.titre, tabResult.ident, true);
                        }
                        else {
                            if (tabResult.code == "OK") {
                                $("#inpt_pbx_montant").val(tabResult.montant);
                                $("#inpt_pbx_site").val(tabResult.site);
                                $("#inpt_pbx_rang").val(tabResult.rang);
                                $("#inpt_pbx_identifiant").val(tabResult.identifiant);
                                $("#inpt_pbx_cmd").val(tabResult.reference);
                                $("#form_formPbx").submit();
                            }
                            else {
                                alertAMalibu(tabResult.msg);
                            }
                        }
                    }
                });
            }
            else {
                $(".a_btnAttenteConfirm").hide();
                $(".a_btChoixPaiement").show();
            }
        });
        $("#div_btnConfirmer > a").click(function () {
            $(this).hide();
            $(".a_btnAttenteConfirm").show();
            if (casesCochees() == true) {
                var urlHref = "etape" + $('#div_btnConfirmer').attr('data-idPageNext') + ".php";
                if (location.search.indexOf("PHPSESSID") > -1)
                    urlHref += location.search; else
                    urlHref += location.search + "&" + idSession;
                document.location = urlHref;
            }
            else {
                $(".a_btnAttenteConfirm").hide();
                $(this).show();
            }
        });
        if ($('.div_choixResaProp').length > 0) {
            $('.div_choixResaProp a').click(function () {
                $('.div_choixResaProp a').removeClass('actif');
                $(this).addClass('actif');
                var divAAfficher = $('#' + $(this).attr('data-div'));
                $('.div_boutonsResaProp').hide();
                divAAfficher.show();
            });
        }
    })(jQuery);
}
function initEtape3_vendeur() {
    (function ($) {
        if ($('.inputMontantReglementPV').length > 0) {
            $('.inputMontantReglementPV').each(function () {
                var id = $(this).attr('id');
                validate = new LiveValidation(id, {validMessage: 'Ok'});
                validate.add(Validate.Custom, {
                    against: function (value, args) {
                        var val = value;
                        var pattern = /^[0-9]+(?:\.[0-9]+)?$/;
                        if (val.match(pattern)) {
                            return true;
                        }
                        return false;
                    }, failureMessage: 'Entrez un montant valide'
                });
            });
            $('.inputMontantReglementPV').keyup(function () {
                verifReglementPV(this);
            });
        }
        $('.a_btValideResaVendeur[data-moderesa="resa"]').click(function () {
            $('.a_btValideResaVendeur').hide();
            if (verifReglementPV() && $('.LV_invalid_field').length == 0) {
                if (casesCochees() == true) {
                    $('.a_btnAttenteConfirm').show();
                    var query = $('#formPaiementPV').serialize();
                    valideResaVendeur(query);
                }
            }
            else {
                $('.a_btValideResaVendeur').show();
            }
        });
        $('.a_btValideResaVendeur[data-moderesa="option"]').click(function () {
            $('.a_btValideResaVendeur').hide();
            $('.a_btnAttenteConfirm').show();
            if (casesCochees() === true) {
                valideResaVendeur();
            }
        });
    })(jQuery);
}
function valideResaVendeur(query) {
    (function ($) {
        var params = query || '';
        params += '&type=valideResaVendeur';
        $.ajax({
            type: "POST", url: urlAJAX, data: params, beforeSend: function () {
            }, success: function (result) {
                eval("var tabResult=" + result);
                if (tabResult.code == errDossierNull) {
                    retourEtape1(tabResult.msg);
                }
                else if (tabResult.errTechnq) {
                    afficheMsgErrTechnq(tabResult.msg, tabResult.titre, tabResult.ident, true);
                }
                else {
                    if (tabResult.code == "OK") {
                        if (!tabResult.cle && !$('#inputPaiementCB').val()) {
                            if (location.search.indexOf("PHPSESSID") > -1) {
                                location.href = "etape4.php" + location.search;
                            } else {
                                location.href = "etape4.php" + location.search + "&" + idSession;
                            }
                        }
                        else {
                            $("#inpt_pbx_montant").val(tabResult.montant);
                            $("#inpt_pbx_site").val(tabResult.site);
                            $("#inpt_pbx_rang").val(tabResult.rang);
                            $("#inpt_pbx_identifiant").val(tabResult.identifiant);
                            $("#inpt_pbx_cmd").val(tabResult.reference);
                            $("#form_formPbx").submit();
                        }
                    }
                    else {
                        alertAMalibu(tabResult.msg);
                    }
                }
            }
        });
    })(jQuery)
}
function verifReglementPV(input) {
    var out = true;
    (function ($) {
        $('#div_msgErreursNombreReglementsCB').hide();
        $('#div_msgErreursNombreReglements').hide();
        $('#div_msgErreursTotalReglement').hide();
        $('#div_msgErreursTotalSupReglement').hide();
        var elemCurr = input || null;
        var prix = parseFloat($("#inpt_pbx_montant").val());
        var total = 0;
        var nbPaiementsCB = 0;
        var nbPaiements = 0;
        $('.inputMontantReglementPV').each(function () {
            if ($(this).val().length > 0) {
                if ($(this).attr('name') == 'paiementCB' || $(this).attr('name') == 'paiementPV_PVB') {
                    nbPaiementsCB++;
                }
                nbPaiements++;
                var value = parseFloat($(this).val());
                total += Math.round(value * 100);
            }
        });
        if (nbPaiementsCB > 1) {
            if (elemCurr) {
                $(elemCurr).val('');
            }
            $('#div_msgErreursNombreReglementsCB').show();
        }
        else {
            if (nbPaiements > 4) {
                $('#div_msgErreursNombreReglements').show();
                out = false;
            }
            else {
                if ((prix - total) < 0) {
                    $('#div_msgErreursTotalSupReglement').show();
                    out = false;
                }
                else {
                    $('#inputTotalReglementPV').val(total);
                    $('#spanTotalReglementPV').html(total / 100);
                    $('#inputResteReglementPV').val(prix - total);
                    $('#spanResteReglementPV').html((prix - total) / 100);
                    if ((prix - total) !== 0) {
                        out = false;
                        if (!elemCurr) {
                            $('#div_msgErreursTotalReglement').show();
                        }
                    }
                }
            }
        }
    })(jQuery);
    return out;
}
function initEtape3_agence() {
    (function ($) {
        $(document).ready(function () {
            idSession = getIdSessionInHtml();
        });
        initBtnsFooter();
        $('#inpt_mailAgence').keyup(function () {
            var regex = new RegExp("[^@\s]+@[-a-z0-9]*\\.[a-z]{2,}");
            var mail = $(this).val();
            if (regex.test(mail)) {
                $('.sp_msgMailAgence.ok').show();
                $('.sp_msgMailAgence.ko').hide();
            } else {
                $('.sp_msgMailAgence.ko').show();
                $('.sp_msgMailAgence.ok').hide();
            }
        });
        $(".a_btValideResaAgence").click(function () {
            $(".a_btValideResaAgence").hide();
            $(".a_btnAttenteConfirm").show();
            var modeResa = $(this).attr('data-moderesa');
            var mailAgence = $('#inpt_mailAgence').val();
            var regex = new RegExp("[^@\s]+@[-a-z0-9]*\\.[a-z]{2,}");
            if (!regex.test(mailAgence)) {
                mailAgence = '';
            }
            var nomClient = '';
            if ($('#inpt_nomClient').length > 0) {
                var tabValidation = [];
                var nom = new LiveValidation("inpt_nomClient", {validMessage: $("#inpt_msgOk").val()});
                nom.add(Validate.Presence, {failureMessage: $("#inpt_msgVide").val()});
                tabValidation.push(nom);
                if (!LiveValidation.massValidate(tabValidation)) {
                    $(".a_btnAttenteConfirm").hide();
                    $(".a_btValideResaAgence").show('fast');
                    $("#div_msgErreursInfosClient").show('fast');
                    document.location = "#div_msgErreursInfosClient";
                    return false;
                }
                nomClient = $('#inpt_nomClient').val();
            }
            var nouveauPrix;
            if ($('#inpt_modifPrixLocationResaAgence').length > 0 || $('.inputModifPrixChambre').length > 0) {
                var tabValidation = [];
                var inputs = $('#inpt_modifPrixLocationResaAgence')[0] || $('.inputModifPrixChambre');
                var nouveauPrix;
                var erreurDeSaisie = false;
                $(inputs).each(function () {
                    if ($(this).val() !== '') {
                        var prixBase = $(this).attr('data-prix');
                        if (!$(this).val().match(/^[0-9]{1,}(\.|,){0,1}[0-9]{0,2}$/g) || parseFloat(prixBase) < parseFloat($(this).val())) {
                            $(".a_btnAttenteConfirm").hide();
                            $(".a_btValideResaAgence").show('fast');
                            if (!$(this).val().match(/^[0-9]{1,}(\.|,){0,1}[0-9]{0,2}$/g)) {
                                $("#div_msgErreursFormatLocation").show('fast');
                            }
                            if (parseFloat(prixBase) < parseFloat($(this).val())) {
                                $("#div_msgErreursMontantLocation").show('fast');
                            }
                            document.location = "#div_msgErreursMontantLocation";
                            erreurDeSaisie = true;
                        }
                        if ($(this).attr('id') == 'inpt_modifPrixLocationResaAgence') {
                            nouveauPrix = $('#inpt_modifPrixLocationResaAgence').val();
                        }
                        else {
                            nouveauPrix = nouveauPrix || {};
                            nouveauPrix[$(this).attr('data-numChambre')] = $(this).val();
                        }
                    }
                });
            }
            if (erreurDeSaisie) {
                return false;
            }
            $.ajax({
                type: "POST",
                url: urlAJAX,
                data: {
                    type: "valideResaAgence",
                    modeResa: modeResa,
                    mailAgence: mailAgence,
                    nomClient: nomClient,
                    nouveauPrix: nouveauPrix
                },
                success: function (result) {
                    eval("var tabResult=" + result);
                    if (tabResult.code == errDossierNull) {
                        retourEtape1(tabResult.msg);
                    }
                    else if (tabResult.errTechnq) {
                        afficheMsgErrTechnq(tabResult.msg, tabResult.titre, tabResult.ident, true);
                    }
                    else {
                        if (tabResult.code == "OK") {
                            if (location.search.indexOf("PHPSESSID") > -1)
                                location.href = "etape4.php" + location.search; else
                                location.href = "etape4.php" + location.search + "&" + idSession;
                        }
                        else {
                            alertAMalibu(tabResult.msg);
                        }
                    }
                }
            });
        });
    })(jQuery);
}
function casesCochees() {
    var retour = false;
    (function ($) {
        if ($("#inpt_valideDocFiche").length > 0 && $("#inpt_valideDocFiche").attr("checked") != "checked") {
            $("#div_msgErreursDocs").show();
            $("#sp_msgErreurFiche").show();
            if (typeof(dataLayer) != 'undefined') {
                dataLayer.push({'ErrorMessage': 'Descriptif_Hebergement', 'event': 'resa3_erreur'});
            }
        } else {
            $("#sp_msgErreurFiche").hide();
        }
        if ($("#inpt_valideDocCgv").length > 0 && $("#inpt_valideDocCgv").attr("checked") != "checked") {
            $("#div_msgErreursDocs").show();
            $("#sp_msgErreurCgv").show();
            if (typeof(dataLayer) != 'undefined') {
                dataLayer.push({'ErrorMessage': 'CGV', 'event': 'resa3_erreur'});
            }
        } else {
            $("#sp_msgErreurCgv").hide();
        }
        if ($("#inpt_valideDocCga").length > 0 && $("#inpt_valideDocCga").attr("checked") != "checked") {
            $("#div_msgErreursDocs").show();
            $("#sp_msgErreurCga").show();
            if (typeof(dataLayer) != 'undefined') {
                dataLayer.push({'ErrorMessage': 'CGA', 'event': 'resa3_erreur'});
            }
        } else {
            $("#sp_msgErreurCga").hide();
        }
        if ($("#sp_msgErreurFiche").is(':hidden') && $("#sp_msgErreurCgv").is(':hidden') && $("#sp_msgErreurCga").is(':hidden')) {
            retour = true;
        } else {
            $('html, body').animate({scrollTop: 0}, 1000);
        }
    })(jQuery);
    return retour;
}
function initEtape4() {
    (function ($) {
        $(document).ready(function () {
            idSession = getIdSessionInHtml();
        });
        initBtnsFooter();
        $("#a_btnRetourSite").click(function () {
            window.onbeforeunload = "";
            $.ajax({
                type: "POST", url: urlAJAX, data: {type: "retourSite"}, beforeSend: function () {
                }, success: function (result) {
                    eval("var tabResult=" + result);
                    if (tabResult.code == errDossierNull) {
                        retourEtape1(tabResult.msg);
                    }
                    else if (tabResult.errTechnq) {
                        afficheMsgErrTechnq(tabResult.msg, tabResult.titre, tabResult.ident, true);
                    }
                    else {
                        if (tabResult.lien.length > 0)
                            document.location = tabResult.lien; else
                            window.close();
                    }
                }
            });
        });
        if ($("#a_btnRetourBureauItea").length > 0) {
            $("#a_btnRetourBureauItea").click(function () {
                window.close();
            });
        }
        if ($("#div_btnModifPrix").length > 0) {
            $("#div_btnModifPrix").hide();
        }
    })(jQuery);
}
function getXHTML_recapOptionsAnimaux() {
    var xhtml = "";
    (function ($) {
        $(".option.animal:has(input:checked)").each(function () {
            xhtml += "<li>";
            xhtml += "<span>" + $(this).find("label").html() + "</span>";
            xhtml += "<span>" + $(this).find("td.td_prixOption").html() + "</span>";
            xhtml += "</li>";
        });
    })(jQuery);
    return xhtml;
}
function getXHTML_recapOptionsObligatoires() {
    var xhtml = "";
    (function ($) {
        $(".option.obligatoire:not(.animal)").each(function () {
            xhtml += "<li>";
            xhtml += "<span>" + $(this).find("label").html() + "</span>";
            xhtml += "<span>" + $(this).find("td.td_prixOption").html() + "</span>";
            xhtml += "</li>";
        });
    })(jQuery);
    return xhtml;
}
function refreshBandeauEtapes(bandeau) {
    (function ($) {
        $('#ul_etapesResa').html(bandeau);
    })(jQuery);
}
function manageChangementTypeResa(retour, modifChambre) {
    (function ($) {
        if (retour.modeResa == 'demandeNres' && typeof(dataLayer) != 'undefined') {
            dataLayer.push({'event': 'resa_datesProches'});
        }
        if (retour.modeResa != 'mail') {
            rechargementPageMAJ();
        }
        else if (modifChambre === true) {
            var textenok = 'Annuler';
            var texteok = 'Valider';
            if (retour.motscles.annuler) {
                textenok = retour.motscles.annuler;
            }
            if (retour.motscles.valider) {
                texteok = retour.motscles.valider;
            }
            $("<div id='dialogMessageInfoModeResa'><p>" + retour.msgInfoModeResa + "</p></div>").dialog({
                dialogClass: 'modaleChangeTypeResa',
                modal: true,
                closeOnEscape: false,
                buttons: [{
                    text: textenok, click: function () {
                        var numChambre = retour.numChambre;
                        $('#inpt_chambre_1').attr('data-annulChoix', 'OK');
                        $('#select_compoFamilleAdulte_' + numChambre).val(0).change();
                        $(this).dialog('close');
                    }
                }, {
                    text: texteok, click: function () {
                        var paramsURL = location.search;
                        if (paramsURL.indexOf("PHPSESSID") > -1) {
                            location.href = location.pathname + paramsURL;
                        }
                        else {
                            location.href = location.pathname + paramsURL + "&" + idSession;
                        }
                    }
                }]
            });
        }
        else {
            var paramsURL = location.search;
            if (paramsURL.indexOf("PHPSESSID") > -1)
                location.href = "etape1.php" + paramsURL; else
                location.href = "etape1.php" + paramsURL + "&" + idSession;
        }
    })(jQuery);
}
function afficheMsgErrTechnq(msg, titre, ident, avecFormulaire) {
    (function ($) {
        $("<div id='dialogMessageErrTechnq'><p>" + msg + "</p></div>").dialog({
            modal: true,
            buttons: {
                "Ok": function () {
                    $(this).dialog('close');
                    if (avecFormulaire) {
                        sendThisToProp(ident, 800, 600, titre, "O");
                    }
                }
            }
        });
    })(jQuery);
}
function initAssurance() {
    (function ($) {
        $("input:radio[name=assur]").click(function () {
            affectAssurance();
            if ($(this).val() == "Avec") {
                $(".sp_recapSansAssurAnnul").hide();
                $(".sp_recapAvecAssurAnnul").show();
            }
            else {
                $(".sp_recapAvecAssurAnnul").hide();
                $(".sp_recapSansAssurAnnul").show();
            }
            etapeCourante($("#div_uneEtape_assuranceAnnul"), true);
        });
        $('input[name="inputTypeClientAssurance"]').each(function () {
            if ($(this).is(':checked')) {
                $('.divFormuleAssurance').hide();
                $('.divFormuleAssuranceType' + $(this).val()).show();
            }
        });
        $('input[name="inputTypeClientAssurance"]').click(function () {
            $('.divFormuleAssurance').hide();
            $('.divFormuleAssuranceType' + $(this).val()).show();
        });
        if ($('input.inpt_choixFormuleAssurance').length > 0) {
            $('input[name="formuleAssurance"]').click(function () {
                var value = $(this).val();
                affectAssurance({action: 'majChoixFormuleAssurance', value: value});
                etapeCourante($("#div_uneEtape_assuranceAnnul"), true);
                if ($(this).val()) {
                    $(".sp_recapSansAssurAnnul").hide();
                    $(".sp_recapAvecAssurAnnul").show();
                }
                else {
                    $(".sp_recapAvecAssurAnnul").hide();
                    $(".sp_recapSansAssurAnnul").show();
                }
            });
        }
    })(jQuery);
}
function initPaiementVersementCompteClient() {
    if ($('input_paiement_cbVersPbx')) {
        $('input_paiement_cbSoldePbx').onclick = function () {
            $("inpt_vers_cptClient").value = 0;
            $("inpt_vers_cptClient").setAttribute('disabled', 'true');
            $('a_boutonValiderCptClientPbx').show();
        };
        $('input_paiement_cbVersPbx').onclick = function () {
            $("inpt_vers_cptClient").removeAttribute('disabled');
            $('a_boutonValiderCptClientPbx').hide();
        }
        var elem = $("inpt_vers_cptClient");
        elem.onchange = function (evt) {
            var val = elem.value;
            var pattern = '^[0-9]+([.]{1}[0-9]{1,2})?$';
            var reg = new RegExp(pattern);
            var test = reg.test(val);
            if (test) {
                var solde = parseFloat($("inpt_solde_cptCliPbx").value);
                var total = parseFloat(val) * 100;
                if ((solde - total) < 0) {
                    $('a_boutonValiderCptClientPbx').hide();
                    alertAMalibu('Le montant saisi est supérieur au solde de la réservation.');
                }
                else {
                    if (total < 100) {
                        $('a_boutonValiderCptClientPbx').hide();
                        alertAMalibu('Le montant saisi doit être supérieur à 1 euro.');
                    }
                    else {
                        $('a_boutonValiderCptClientPbx').show();
                    }
                }
            }
            else {
                if (val.length != 0) {
                    alertAMalibu('Le montant saisi doit être numérique et les décimales séparées par un point.');
                }
            }
        }
    }
}
function verifMontantVersement() {
    var pattern = '^[0-9]+([.]{1}[0-9]{1,2})?$';
    var elem = $("inpt_vers_cptClient");
    var reg = new RegExp(pattern);
    return reg.test(elem.value);
}
function initCanevasResaCouplee(reinitCanevas) {
    var forceReinit = reinitCanevas || false;
    if (!forceReinit) {
        initActionsCanevas();
        rendChoixCanevasPossible();
    }
    else {
        getCanevasPossibles();
    }
}
function getCanevasPossibles() {
    (function ($) {
        var numEtape = $("#div_uneEtape_canevas").prev(".div_uneEtape").find(".sp_numEtape").text();
        numEtape = parseInt(numEtape) + 1;
        var data = '';
        if (!gestprod) {
            data = "TYPE=verifCanevasResaCouplee&numetape=" + numEtape;
        } else {
            data = "TYPE=verifCanevasResaGP&numetape=" + numEtape;
        }
        $.ajax({
            type: "POST", dataType: "xml", url: urlAJAX, data: data, beforeSend: function () {
                affMsgAttenteParDessusInDiv("div_uneEtape_canevas", "canevas", txtAttente);
            }, complete: function () {
                effaceMsgAttenteParDessus("canevas");
            }, success: function (xml) {
                var code = $(xml).find("code").text();
                if (code == "OK") {
                    var html = $(xml).find('HTML').text();
                    $('#div_uneEtape_canevas').html(html);
                    initActionsCanevas();
                    if ($("#div_uneEtape_canevas").css("display") == 'none') {
                        $("#div_uneEtape_canevas").show();
                    }
                    numEtape++;
                    $("#div_uneEtape_canevas").nextAll(".div_uneEtape").each(function () {
                        $(this).find(".sp_numEtape").text(numEtape);
                        numEtape++;
                    });
                    rendChoixCanevasPossible();
                }
            }, error: function (data) {
                alertAJquery(data);
            }
        });
    })(jQuery)
}
function initActionsCanevas() {
    (function ($) {
        $('#div_recapInfosEtPrix').click(function (e) {
            var element = $(e.target);
            if (($(e.target).hasClass('spanSupprimerTarifSupplement'))) {
                var ligneFacture = $(e.target).get(0);
                var identifiantSupplementPossible = '';
                var regex = new RegExp('^[0-9]+_[0-9]+_[0-9]+_' + $(ligneFacture).attr('data-idtarif') + '$');
                var selectAMettreAJour = null;
                $('.lstChoixSupplQte').each(function () {
                    if (regex.test($(this).attr('data-identifiant'))) {
                        identifiantSupplementPossible = $(this).attr('data-identifiant');
                        selectAMettreAJour = $(this);
                    }
                });
                if (identifiantSupplementPossible) {
                    $(ligneFacture).attr('data-identifiant', identifiantSupplementPossible);
                    majChoixCanevas(ligneFacture);
                    selectAMettreAJour.val(0);
                }
            }
        });
        $(".lstChoixSupplQte").change(function () {
            majChoixCanevas(this);
            if ($(this).parents('.tarifElementRubriqueCanevas').is('.nonCumulable')) {
                majRubriqueCanevasAvecElementNonCumulable($(this));
            }
        });
        $(".inpt_choixQteCanevas_forfait").change(function () {
            majChoixCanevas(this);
            if ($(this).parents('.tarifElementRubriqueCanevas').is('.nonCumulable')) {
                majRubriqueCanevasAvecElementNonCumulable($(this));
            }
        });
        $(".select_heureVoiture").change(function () {
            var element = $(this).attr("data-identifiant");
            var qte = parseInt($(".lstChoixSupplQte[data-identifiant='" + element + "']").val());
            if (qte > 0) {
                majChoixCanevas($(".lstChoixSupplQte[data-identifiant='" + element + "']"));
            }
        });
        $(".lstChoixSupplDate").change(function () {
            var dates = $(this).val();
            var element = $(this).attr("data-identifiant");
            $(".inputChoixSupplDate[data-identifiant='" + element + "']").val(dates);
            var qte = parseInt($(".lstChoixSupplQte[data-identifiant='" + element + "']").val());
            if (qte > 0 || (qte == 0 && $('.tr_prixSupplements').length > 0)) {
                majChoixCanevas($(".lstChoixSupplQte[data-identifiant='" + element + "']"));
            }
        });
        if (jQuery('.viewWithQtip').length > 0) {
            jQuery('.viewWithQtipTohide').hide()
            jQuery('.viewWithQtip').each(function () {
                if (jQuery(this).attr('data-qhelp') && jQuery("#" + jQuery(this).attr('data-qhelp'))) {
                    jQuery(this).qtip({
                        content: {
                            text: jQuery("#" + jQuery(this).attr('data-qhelp')).html(),
                            title: {text: jQuery(this).attr('data-qtitle')}
                        }, show: 'mouseover', hide: 'mouseout'
                    })
                }
            })
        }
        $(".a_canevasAfficheDetail").fancybox({
            maxWidth: 800,
            maxHeight: 600,
            fitToView: false,
            width: '70%',
            height: '70%',
            autoSize: false,
            closeClick: false,
            openEffect: 'none',
            closeEffect: 'none'
        });
        $(".bouton_ajouter_canevas").toggle(function () {
            $(this).parents(".divUneRubriqueCanevas").children(".liste_tarifs_de_la_rubrique").show('fast');
        }, function () {
            $(this).parents(".divUneRubriqueCanevas").children(".liste_tarifs_de_la_rubrique").hide('fast');
        });
        $("#aToggleChoixCanevas").toggle(function () {
            $('.divListeRubriquesDuCanevas .divUneRubriqueCanevas:not(".canevasObligatoire")').hide('fast');
            $(this).children('#spanCanevasCache').hide();
            $(this).children('#spanCanevasAffiche').show();
        }, function () {
            $('.divListeRubriquesDuCanevas .divUneRubriqueCanevas').show('fast');
            $(this).children('#spanCanevasAffiche').hide();
            $(this).children('#spanCanevasCache').show();
        });
        if ($('.divUneRubriqueCanevas.canevasObligatoire').length > 0) {
        }
    })(jQuery)
}
function majChoixCanevas(obj) {
    (function ($) {
        var element = $(obj).attr("data-identifiant");
        var quantite;
        if ($(obj).is(':checkbox')) {
            quantite = 0;
            if ($(obj).is(':checked')) {
                var codeProd = $(obj).parents('.divListeRubriquesDuCanevas').attr('data-codeProd');
                $('.select_compoNbPers_' + codeProd).each(function () {
                    var elem = $(this);
                    quantite += parseInt(elem.val());
                });
            }
        } else {
            quantite = $(obj).val();
        }
        var dates = $(".inputChoixSupplDate[data-identifiant='" + element + "']").val();
        var tabDates = dates.split('_');
        var dateDeb = tabDates[0];
        var dateFin = tabDates[1];
        if ($(".select_heureVoiture[data-identifiant='" + element + "']").length > 0) {
            if (quantite > 0) {
                $(".sp_choixHeureVoiture[data-identifiant='" + element + "']").show();
            } else {
                $(".sp_choixHeureVoiture[data-identifiant='" + element + "']").hide();
            }
            var heureVoiture = $(".select_heureVoiture[data-identifiant='" + element + "']").val();
            var libelleRub = $(obj).parents('.divUneRubriqueCanevas').children('h3').text();
        }
        var type = '';
        if (!gestprod) {
            type = 'affectCanevasResaCouplee';
        } else {
            type = 'affectCanevasResaGP';
        }
        $.ajax({
            type: "POST",
            dataType: 'xml',
            url: urlAJAX,
            data: "TYPE=" + type + "&elementRubrique=" + element + "&quantite=" + quantite + "&dateDeb=" + dateDeb + "&dateFin=" + dateFin + "&heureVoiture=" + heureVoiture + "&libelleRub=" + libelleRub,
            beforeSend: function () {
                affMsgAttenteParDessusInDiv("div_resaContenu", "contenu", txtAttente);
            },
            complete: function () {
                effaceMsgAttenteParDessus("contenu");
            },
            success: function (data) {
                var xml = $(data);
                var tabResult = XMLToArray(xml);
                if (tabResult['code'] == "OK") {
                    if (tabResult["maj"] != undefined) {
                        rechargementPageMAJ();
                    }
                    else {
                        $('.choixSupplements_prixTotal[data-identifiant="' + element + '"]').html(tabResult["prixDuSupplement"]);
                        $('#div_recapPrix').html(tabResult['recapPrix']);
                        majAssurance(null, tabResult['choixAssurance'], tabResult['prixAssurance']);
                    }
                }
                else {
                    if (tabResult['htmlErreur']) {
                        alertAJquery(tabResult['htmlErreur']);
                    } else {
                        alertAJquery('Une erreur 5168 s\'est produite');
                    }
                }
            },
            error: function (data) {
                alert(data);
            }
        });
    })(jQuery)
}
function rendChoixCanevasPossible() {
    (function ($) {
        if ($("#div_recapInfosFamille").length > 0 || $('#div_uneEtape_choixNDate').length > 0) {
            $("#div_uneEtape_canevas").find("*:not(.inpt_choixQteCanevas_forfait)").attr("disabled", false);
            $("#div_uneEtape_canevas").removeClass('div_uneEtapeGrisee');
        }
        else {
            $("#div_uneEtape_canevas").addClass('div_uneEtapeGrisee');
            $("#div_uneEtape_canevas *").find("*:not(.inpt_choixQteCanevas_forfait)").attr("disabled", true);
        }
        if ($('.divUneRubriqueCanevas.canevasObligatoire').length > 0) {
            if ($('.divUneRubriqueCanevas:not(.canevasObligatoire)').length == 0) {
                $('#div_uneEtape_canevas > .div_titreEtape').hide();
            }
            majNumEtapes();
        }
    })(jQuery)
}
function majLstCanevasOblig(nbPers) {
    (function ($) {
        if ($('.divUneRubriqueCanevas.canevasObligatoire').length > 0) {
            $('.divUneRubriqueCanevas.canevasObligatoire').each(function () {
                $(this).attr('data-nbPers', nbPers);
                var lstQte = $(this).find('.lstChoixSupplQte');
                lstQte.each(function () {
                    if ($(this).val() > nbPers) {
                        majChoixCanevas($(this));
                    }
                    $(this).find('option').each(function () {
                        var valOption = parseInt($(this).val())
                        if (valOption > nbPers) {
                            $(this).hide();
                        } else {
                            $(this).show();
                        }
                    });
                });
            });
        }
        if (nbPers == 0) {
            $('.inpt_choixQteCanevas_forfait:checked').each(function () {
                $(this).attr('checked', false);
                $(this).change();
            });
        } else {
            $('.inpt_choixQteCanevas_forfait:checked').each(function () {
                $(this).change();
            });
        }
    })(jQuery);
}
function verifQteCanevasOblig() {
    (function ($) {
        var nbPers;
        var qte = 0;
        $('.divUneRubriqueCanevas.canevasObligatoire').each(function () {
            nbPers = $(this).attr('data-nbpers');
            $(this).find('.lstChoixSupplQte').each(function () {
                qte += parseInt($(this).val());
            });
            if (qte != nbPers) {
                $('#div_uneEtape_canevas').find('.inpt_validEtape').val('Non');
            } else {
                $('#div_uneEtape_canevas').find('.inpt_validEtape').val('Oui');
            }
            qte = 0;
            if ($(this).find('.inpt_choixQteCanevas_forfait:checked').length > 0) {
                $('#div_uneEtape_canevas').find('.inpt_validEtape').val('Oui');
            }
        });
    })(jQuery);
}
function rechargementPageMAJ(tabRetour) {
    affMsgAttenteParDessusInDiv("div_resaContenu", "contenu", txtAttente);
    var tabParam = tabRetour || [];
    if (tabParam.url) {
        location.href = tabParam.url;
        return;
    }
    var paramsURL = location.search;
    if (tabParam.ident) {
        paramsURL = "?ident=" + tabRetour.ident;
    }
    if (paramsURL.indexOf("PHPSESSID") == -1)
        paramsURL += "&" + idSession;
    if (tabParam.ancre) {
        paramsURL += "#" + tabParam.ancre;
    }
    var oldHref = location.href;
    var tabInfosHref = oldHref.split('/');
    var nomFichier = tabInfosHref.pop();
    var dossierResa = tabInfosHref.pop();
    var pathname = dossierResa + '/' + nomFichier;
    if (pathname != location.pathname + paramsURL) {
        location.href = location.pathname + paramsURL;
    }
    else {
        window.location.reload();
    }
    return;
}
function majAssurance(objResult, htmlResult, montantResult) {
    (function ($) {
        var htmlAssurance = false;
        var montantAssurance = false;
        if (objResult) {
            htmlAssurance = objResult.htmlAssurance;
        } else if (htmlResult) {
            htmlAssurance = htmlResult;
        }
        if (htmlAssurance && $('#div_assuranceAnnul').length > 0) {
            $('#div_assuranceAnnul').html(htmlAssurance);
            if (objResult) {
                montantAssurance = objResult.assurance;
            } else if (montantResult) {
                montantAssurance = montantResult;
            }
            if (montantAssurance) {
                var montantReelAssurance = montantAssurance.replace('&euro;', '');
                montantReelAssurance = montantReelAssurance.replace(' ', '');
                try {
                    montantReelAssurance = parseInt(montantReelAssurance);
                }
                catch (e) {
                    montantReelAssurance = 1;
                }
                if (montantReelAssurance > 0) {
                    if ($("#sp_montantAssur").length > 0) {
                        $("#sp_montantAssur").html(montantAssurance);
                    } else {
                        $(".sp_montantAssur:visible").html(montantAssurance);
                    }
                }
            }
            initAssurance();
        } else {
            $('#div_assuranceAnnul').html('');
        }
        if ($('#div_assuranceAnnul').find('.inpt_validEtape').length == 0) {
            $('#div_uneEtape_assuranceAnnul').hide('fast');
        }
        else {
            $('#div_uneEtape_assuranceAnnul').show('fast');
        }
        if ($("#inpt_assurOui").is(':visible:checked') && $('#div_uneEtape_assuranceAnnul').find('.inpt_validEtape').val() == 'Non') {
            $("#inpt_assurOui").click();
        }
    })(jQuery)
}
function initEtape1_GP() {
    (function ($) {
        $.ajaxSetup({timeout: 100000});
        gestprod = true;
        initLangue();
        idSession = getIdSessionInHtml();
        nbMois = $("#inpt_nbMoisCalend").val();
        if (!nbMois) {
            nbMois = 2;
        }
        initBtnsFooter();
        $.datepicker.setDefaults($.datepicker.regional[lang]);
        $(".div_uneEtapeRecap:hidden:first").parent().addClass('div_uneEtapeCurr');
        $(".sp_fermerCal").click(function () {
            $(this).parents(".div_calendDateDebFin").hide();
        });
        $("#inpt_resaDateDeb").click(function () {
            $("#div_calendrierDeb").show().addClass("open");
            $("#div_msgErreursDateDeb").hide();
            $("#div_calendrierFin").hide().removeClass("open");
            $.ajax({
                type: "POST", url: urlAJAX, async: true, data: {type: "getPlanningDeb_GP"}, beforeSend: function () {
                    $("#div_roueDatepickerDeb").show();
                }, success: function (result) {
                    eval("var tabDispos=" + result);
                    if (tabDispos.code == errDossierNull) {
                        retourEtape1(tabDispos.msg);
                    }
                    else if (tabDispos.errTechnq) {
                        afficheMsgErrTechnq(tabDispos.msg, tabDispos.titre, tabDispos.ident, true);
                    }
                    else if (tabDispos.code == "OK") {
                        chainePlanning = tabDispos.chaineDispo;
                        dateDebPlanning = tabDispos.dateDeb;
                        dateFinPlanning = tabDispos.dateFin;
                        infoBulles = tabDispos.infoBulle;
                        initDatePickerDeb();
                    }
                    else {
                        alertAMalibu(tabDispos.msg);
                        $("#div_calendrierDeb").hide().removeClass("open");
                        $("#div_uneEtape_date").find(".inpt_validEtape").val("Non");
                    }
                    $("#div_roueDatepickerDeb").hide();
                }
            });
            return false;
        });
        $(".div_uneEtapeGrisee *").attr("disabled", true);
        if ($("#div_uneEtape_hotelChoixChambre").length > 0) {
            setEventsForHotel();
        }
        if ($('#div_uneEtape_locatChoixChambre').length > 0) {
            setEventsForLocat();
        }
        if ($('#div_uneEtape_billetChoixPresta').length > 0) {
            setEventsForBillet();
        }
        if ($("#div_uneEtape_choixNDate").length > 0) {
            setEventsForNDate();
        }
        if ($("#div_uneEtape_packageChoixTarif").length > 0) {
            setEventsForPack();
        }
        if ($('#div_uneEtape_voitureChoixPresta').length > 0) {
            setEventsForVoiture();
        }
        $("#inpt_resaDateFin").click(function () {
            var regDate = new RegExp("[0-9]{2}\/[0-9]{2}\/[0-9]{4}");
            $("#div_calendrierDeb").hide();
            if (regDate.test($("#inpt_resaDateDeb").val())) {
                $("#div_calendrierFin").show().addClass("open");
            }
            else {
                $("#div_msgErreursDateDeb").show();
            }
        });
        initAssurance();
        initModifEtape();
        $("#inpt_motMagique").blur(function () {
            if ($("#inpt_motMagique").val() != "") {
                verifMotMagique(true);
            }
        });
        $("#div_btnConfirmer > a:not(.a_btnAttenteConfirm)").click(function () {
            $(this).hide();
            $(".a_btnAttenteConfirm").show();
            if (etapesValid()) {
                var paramsURL = location.search;
                if (paramsURL.indexOf("FINSESSION") > -1) {
                    paramsURL = paramsURL.replace("FINSESSION=1", "");
                }
                var numeroEtape = '2';
                if ($('#divNumeroProchaineEtape').length > 0) {
                    numeroEtape = $('#divNumeroProchaineEtape').attr('data-prochaineEtape');
                }
                if (paramsURL.indexOf("PHPSESSID") > -1) {
                    location.href = 'etape' + numeroEtape + '.php' + paramsURL;
                }
                else {
                    location.href = 'etape' + numeroEtape + '.php' + paramsURL + "&" + idSession;
                }
            }
            $(".a_btnAttenteConfirm").hide();
            $(this).show();
        });
    })(jQuery);
}
function setEventsForHotel() {
    (function ($) {
        $(".select_nbAdultesHotel").live("change", function () {
            var nbPersMaxi = $(this).parents('.tr_tarifHotel').attr('data-nbmaxtotal');
            var nbAdultes = $(this).val();
            var nbEnfantsMax = parseInt(nbPersMaxi) - parseInt(nbAdultes);
            var listeEnfants = $(this).parents('.tr_tarifHotel').find('.select_nbEnfantsHotel');
            if (nbAdultes == 0) {
                listeEnfants.val(0);
                listeEnfants.change();
            } else {
                $(this).parents('.tr_tarifHotel').removeClass('invalide');
                $(this).parents('.tr_tarifHotel').find('.sp_msgErreurAdultes').hide();
            }
            if (nbEnfantsMax == 0) {
                listeEnfants.hide();
            } else {
                listeEnfants.show();
                listeEnfants.find('option').each(function () {
                    if ($(this).val() > nbEnfantsMax) {
                        $(this).hide();
                    } else {
                        $(this).show();
                    }
                });
            }
            var codeStock = $(this).parents('.tr_tarifHotel').attr('data-codestock');
            verifNbPaxCodeStock_hotel(codeStock);
            var nbAdultesTot = 0;
            $('.select_nbAdultesHotel:visible').each(function () {
                if ($(this).val() > 0) {
                    nbAdultesTot += $(this).val();
                }
            });
            if (nbAdultesTot == 0) {
                $('#div_uneEtape_hotelChoixChambre').find('.inpt_validEtape').val('Non');
                $('#div_recapPrix').hide();
                $('#div_recapInfosFamille').remove();
            }
            else {
                setLignesFactures_hotel();
            }
            majListesSupplementsHotel();
        });
        $(".select_nbEnfantsHotel").live("change", function () {
            var nbEnfants = $(this).val();
            var nbAdultes = $(this).parents('.tr_tarifHotel').find('.select_nbAdultesHotel').val();
            var nbPersMaxi = $(this).parents('.tr_tarifHotel').attr('data-nbmaxtotal');
            var nbAdultesMax = parseInt(nbPersMaxi) - parseInt(nbEnfants);
            var listeAdultes = $(this).parents('.tr_tarifHotel').find('.select_nbAdultesHotel');
            listeAdultes.find('option').each(function () {
                if ($(this).val() > nbAdultesMax) {
                    $(this).hide();
                } else {
                    $(this).show();
                }
            });
            if (nbAdultes > 0) {
                setLignesFactures_hotel();
            }
            majListesSupplementsHotel();
        });
        setEventsSupplements(setLignesFactures_hotel);
        $('.a_btnChoixTarif').live('click', function () {
            var div = $(this).attr('data-div');
            var divTarif = $('.' + div + '.divDeBase').clone();
            $(this).parents('.div_uneChambre_choixTarif').after(divTarif);
            divTarif.removeClass('divDeBase').show();
            $(this).parents('.div_uneChambre_choixTarif').hide();
        });
        $('.a_modifTarif').live('click', function () {
            $(this).parents('.div_uneChambreTarifs').siblings('.div_uneChambre_choixTarif:not(".divDeBase")').show();
            $(this).parents('.div_uneChambreTarifs').remove();
            setLignesFactures_hotel();
        });
    })(jQuery);
}
function gestionMultiTarifs(elemListe) {
    (function ($) {
        var nbTarifs = elemListe.val();
        if (nbTarifs > 0) {
            var nbDivChoix = elemListe.parents(".div_uneChambreContent").find(".div_uneChambre_choixTarif").not(".divDeBase").length;
            if (nbDivChoix > nbTarifs) {
                var diff = nbDivChoix - nbTarifs;
                for (var i = 1; i <= diff; i++) {
                    if (elemListe.parents(".div_uneChambreContent").find(".div_uneChambre_choixTarif").not(".divDeBase").last().next().is('.div_uneChambreTarifs:not(.divDeBase)')) {
                        elemListe.parents(".div_uneChambreContent").find(".div_uneChambre_choixTarif").not(".divDeBase").last().next().remove();
                    }
                    elemListe.parents(".div_uneChambreContent").find(".div_uneChambre_choixTarif").not(".divDeBase").last().remove();
                }
            } else {
                for (var i = 1; i <= nbTarifs; i++) {
                    if (i > nbDivChoix) {
                        if (elemListe.parents(".div_uneChambreContent").find(".div_uneChambre_choixTarif").not(".divDeBase").last().next().is('.div_uneChambreTarifs:not(.divDeBase)')) {
                            ajouteDivChoixTarif(elemListe.parents(".div_uneChambreContent").find(".div_uneChambre_choixTarif").not(".divDeBase").last().next(), i);
                        } else {
                            var lastDiv;
                            if (nbDivChoix == 0) {
                                lastDiv = elemListe.parents(".div_uneChambreContent").find(".div_uneChambre_choixTarif.divDeBase");
                            } else {
                                lastDiv = elemListe.parents(".div_uneChambreContent").find(".div_uneChambre_choixTarif").not(".divDeBase").last();
                            }
                            ajouteDivChoixTarif(lastDiv, i);
                        }
                    }
                }
            }
            if (nbTarifs == 1) {
                $('.p_lblChoixTarif').hide();
            } else {
                $('.p_lblChoixTarif').show();
            }
        } else {
            elemListe.parents('.div_uneChambreContent').find('.div_uneChambre_choixTarif:not(.divDeBase)').remove();
            elemListe.parents('.div_uneChambreContent').find('.div_uneChambreTarifs:not(.divDeBase)').remove();
        }
    })(jQuery);
}
function ajouteDivChoixTarif(lastDiv, numChoix) {
    (function ($) {
        var divChoixTarif = lastDiv.parents('.div_uneChambreContent').find('.div_uneChambre_choixTarif.divDeBase');
        divChoixTarif.find('.sp_numChoix').text(numChoix);
        var htmlChoixTarif = divChoixTarif.html();
        htmlChoixTarif = '<div class="div_uneChambre_choixTarif">' + htmlChoixTarif + '</div>';
        var nbDivVisible = lastDiv.parents(".div_uneChambreContent").find(".div_uneChambre_choixTarif").not(".divDeBase").length;
        if (nbDivVisible == 0) {
            divChoixTarif.after(htmlChoixTarif);
        } else {
            lastDiv.after(htmlChoixTarif);
        }
    })(jQuery);
}
function gestionMonoTarif(elemListe) {
    (function ($) {
        if (elemListe.val() > 0) {
            var contentDiv = elemListe.parents(".div_uneChambreContent").find(".div_uneChambreTarifs.divDeBase").html();
            contentDiv = "<div class='div_uneChambreTarifs'>" + contentDiv + "</div>";
            var nbDivVisible = elemListe.parents(".div_uneChambreContent").find(".div_uneChambreTarifs").not(".divDeBase").length;
            var i;
            if (elemListe.val() > nbDivVisible) {
                var nbAAjouter = elemListe.val() - nbDivVisible;
                for (i = 0; i < nbAAjouter; i++) {
                    if (nbDivVisible == 0) {
                        elemListe.parents(".div_uneChambreContent").find(".div_uneChambreTarifs.divDeBase").after(contentDiv);
                    }
                    else {
                        elemListe.parents(".div_uneChambreContent").find(".div_uneChambreTarifs").not(".divDeBase").last().after(contentDiv);
                    }
                }
            }
            else {
                var nbASupprimer = nbDivVisible - elemListe.val();
                for (i = 0; i < nbASupprimer; i++) {
                    elemListe.parents(".div_uneChambreContent").find(".div_uneChambreTarifs").not(".divDeBase").last().remove();
                }
                setLignesFactures_hotel();
            }
        }
        else {
            elemListe.parents(".div_uneChambreContent").find(".div_uneChambreTarifs").not(".divDeBase").remove();
            var nbPers = 0;
            $('.select_compoFamille:visible').each(function () {
                if (elemListe.val() > 0) {
                    nbPers = 1;
                    return false;
                }
            });
            if (nbPers == 0) {
                $('#div_uneEtape_hotelChoixChambre').find('.inpt_validEtape').val('Non');
                $('#div_recapPrix').hide();
                $('#div_recapInfosFamille').remove();
            }
            else {
                setLignesFactures_hotel();
            }
        }
    })(jQuery);
}
function setLignesFactures_hotel() {
    (function ($) {
        var lignesFactures = new Array();
        var i = 0;
        $(".tr_tarifHotel:visible").each(function () {
            var tarifs = new Array();
            var nbAdultes = 0;
            var nbEnfants = 0;
            var codeStock = $(this).attr("data-codestock");
            var idTarif = $(this).attr("data-idtarif");
            var j = 0;
            nbAdultes = $(this).find(".select_nbAdultesHotel").val();
            if ($(this).find(".select_nbEnfantsHotel").length > 0) {
                nbEnfants = $(this).find(".select_nbEnfantsHotel").val();
            } else {
                nbEnfants = 0;
            }
            var nbPax = parseInt(nbAdultes) + parseInt(nbEnfants);
            if (nbPax > 0) {
                tarifs[j] = new Array(idTarif, nbPax);
                j++;
            }
            if (nbAdultes > 0) {
                lignesFactures[i] = new Array(codeStock, nbAdultes, nbEnfants, tarifs);
                i++;
            }
        });
        $(".tr_tarifSupplement:visible").each(function () {
            var tarifs = new Array();
            var nbAdultes = 0;
            var nbEnfants = 0;
            var codeStock = '';
            var idTarif = $(this).attr("data-idtarif");
            var j = 0;
            if ($(this).find(".select_qteSupplement").length > 0) {
                nbAdultes = $(this).find(".select_qteSupplement").val();
                nbEnfants = 0;
            } else if ($(this).find(".select_supplementForfaitaire").length > 0) {
                nbAdultes = $(this).find(".select_supplementForfaitaire").val();
                nbEnfants = 0;
            }
            var nbPax = parseInt(nbAdultes) + parseInt(nbEnfants);
            if (nbPax > 0) {
                tarifs[j] = new Array(idTarif, nbPax);
                j++;
            }
            lignesFactures[i] = new Array(codeStock, nbAdultes, nbEnfants, tarifs, null, null, true);
            i++;
        });
        $.ajax({
            type: "POST",
            url: urlAJAX,
            data: {type: "setLignesFactures", lignesFactures: lignesFactures},
            beforeSend: function () {
                affMsgAttenteParDessusInDiv("div_recapPrix", "recapPrix", txtAttente);
            },
            success: function (result) {
                var tabResult = XMLToArray(result);
                if (tabResult.code == "OK") {
                    if (tabResult.recapPrix) {
                        afficheEffaceRecapPrix_Prod(tabResult);
                    } else {
                        $("#div_recapInfos").html(tabResult.recapInfos);
                        $("#div_recapPrix").hide();
                    }
                    if (tabResult.nbPers) {
                        majLstCanevasOblig(tabResult.nbPers);
                    }
                    effaceMsgAttenteParDessus("recapPrix");
                }
            }
        });
    })(jQuery);
}
function setLignesFactures() {
    (function ($) {
        var lignesFactures = new Array();
        var i = 0;
        $(".div_uneChambreTarifs:visible").each(function () {
            var tarifs = new Array();
            var nbAdultes = 0;
            var nbEnfants = 0;
            var codeStock = $(this).find(".inpt_codeStock").val();
            var divTarifs = $(this).children(".div_tarif");
            var j = 0;
            var nbAduDec;
            var nbEnfDec;
            var commLF = '';
            divTarifs.each(function () {
                $(this).removeClass('invalide');
                var idTarif = $(this).find(".inpt_idTarif").val();
                if ($(this).find(".select_compoQte").length > 0) {
                    nbAduDec = $(this).find(".select_compoQte").val();
                    nbEnfDec = 0;
                } else if ($(this).find(".inpt_supplementForfaitaire").length > 0) {
                    if ($(this).find(".inpt_supplementForfaitaire").is(':checked')) {
                        nbAduDec = 1;
                        nbEnfDec = 0;
                    } else {
                        nbAduDec = 0;
                        nbEnfDec = 0;
                    }
                } else {
                    nbAduDec = $(this).find(".select_compoFamilleAdulte").val();
                    if ($(this).find(".select_compoFamilleEnfant").length > 0) {
                        nbEnfDec = $(this).find(".select_compoFamilleEnfant").val();
                    } else {
                        nbEnfDec = 0;
                    }
                }
                var nbPax = parseInt(nbAduDec) + parseInt(nbEnfDec);
                if (!$(this).hasClass("supplement")) {
                    nbAdultes = nbAduDec;
                    nbEnfants = nbEnfDec;
                }
                if (nbPax > 0) {
                    tarifs[j] = new Array(idTarif, nbPax);
                    j++;
                }
                if ($(this).find('.sp_choixHeureVoiture').length > 0) {
                    commLF = $(this).find('.select_heureVoiture').val();
                }
            });
            lignesFactures[i] = new Array(codeStock, nbAdultes, nbEnfants, tarifs, commLF);
            i++;
        });
        $.ajax({
            type: "POST",
            url: urlAJAX,
            data: {type: "setLignesFactures", lignesFactures: lignesFactures},
            beforeSend: function () {
                affMsgAttenteParDessusInDiv("div_recapPrix", "recapPrix", txtAttente);
            },
            success: function (result) {
                var tabResult = XMLToArray(result);
                if (tabResult.code == "OK") {
                    if (tabResult.recapPrix) {
                        afficheEffaceRecapPrix_Prod(tabResult);
                    } else {
                        $("#div_recapInfos").html(tabResult.recapInfos);
                        $("#div_recapPrix").hide();
                    }
                    if (tabResult.nbPers) {
                        majLstCanevasOblig(tabResult.nbPers);
                    }
                    effaceMsgAttenteParDessus("recapPrix");
                }
            }
        });
    })(jQuery);
}
function setLignesFactures_locat() {
    (function ($) {
        var lignesFactures = new Array();
        var i = 0;
        $(".tr_tarifLocat:visible").each(function () {
            var tarifs = new Array();
            var nbAdultes = 0;
            var nbEnfants = 0;
            var codeStock = $(this).attr("data-codestock");
            var idTarif = $(this).attr("data-idtarif");
            var j = 0;
            nbAdultes = $(this).find(".select_nbAdultesLocat").val();
            if ($(this).find(".select_nbEnfantsLocat").length > 0) {
                nbEnfants = $(this).find(".select_nbEnfantsLocat").val();
            } else {
                nbEnfants = 0;
            }
            var nbPax = parseInt(nbAdultes) + parseInt(nbEnfants);
            if (nbPax > 0) {
                tarifs[j] = new Array(idTarif, nbPax);
                j++;
            }
            $('.tr_tarifSupplement').each(function () {
                if ($(this).attr('data-idtarifprod') == idTarif) {
                    var nbPaxSuppl = 0;
                    var idTarifSuppl = $(this).attr('data-idtarif');
                    if ($(this).find(".select_qteSupplement").length > 0) {
                        nbPaxSuppl = $(this).find(".select_qteSupplement").val();
                    } else if ($(this).find(".select_supplementForfaitaire").length > 0) {
                        nbPaxSuppl = $(this).find(".select_supplementForfaitaire").val();
                    }
                    if (nbPaxSuppl > 0) {
                        tarifs[j] = new Array(idTarifSuppl, nbPaxSuppl);
                        j++;
                    }
                }
            });
            if (nbAdultes > 0) {
                lignesFactures[i] = new Array(codeStock, nbAdultes, nbEnfants, tarifs);
                i++;
            }
        });
        $.ajax({
            type: "POST",
            url: urlAJAX,
            data: {type: "setLignesFactures", lignesFactures: lignesFactures},
            beforeSend: function () {
                affMsgAttenteParDessusInDiv("div_recapPrix", "recapPrix", txtAttente);
            },
            success: function (result) {
                var tabResult = XMLToArray(result);
                if (tabResult.code == "OK") {
                    if (tabResult.recapPrix) {
                        afficheEffaceRecapPrix_Prod(tabResult);
                    } else {
                        $("#div_recapInfos").html(tabResult.recapInfos);
                        $("#div_recapPrix").hide();
                    }
                    if (tabResult.nbPers) {
                        majLstCanevasOblig(tabResult.nbPers);
                    }
                    effaceMsgAttenteParDessus("recapPrix");
                }
            }
        });
    })(jQuery);
}
function setLignesFactures_billet() {
    (function ($) {
        var lignesFactures = new Array();
        var i = 0;
        $(".tr_tarifBillet:visible").each(function () {
            var tarifs = new Array();
            var codeStock = $(this).attr("data-codestock");
            var idTarif = $(this).attr("data-idtarif");
            var nbAdultes = 0;
            var nbEnfants = 0;
            var j = 0;
            if ($(this).find(".select_qteBillet").length > 0) {
                nbAdultes = $(this).find(".select_qteBillet").val();
                nbEnfants = 0;
            }
            var nbPax = parseInt(nbAdultes) + parseInt(nbEnfants);
            if (nbPax > 0) {
                tarifs[j] = new Array(idTarif, nbPax);
                j++;
            }
            lignesFactures[i] = new Array(codeStock, nbAdultes, nbEnfants, tarifs);
            i++;
        });
        $.ajax({
            type: "POST",
            url: urlAJAX,
            data: {type: "setLignesFactures", lignesFactures: lignesFactures},
            beforeSend: function () {
                affMsgAttenteParDessusInDiv("div_recapPrix", "recapPrix", txtAttente);
            },
            success: function (result) {
                var tabResult = XMLToArray(result);
                if (tabResult.code == "OK") {
                    if (tabResult.recapPrix) {
                        afficheEffaceRecapPrix_Prod(tabResult);
                    } else {
                        $("#div_recapInfos").html(tabResult.recapInfos);
                        $("#div_recapPrix").hide();
                    }
                    if (tabResult.nbPers) {
                        majLstCanevasOblig(tabResult.nbPers);
                    }
                    effaceMsgAttenteParDessus("recapPrix");
                }
            }
        });
    })(jQuery);
}
function verifNbPax() {
    (function ($) {
        var etapeValide = true;
        var div = $('.div_uneEtape_prodGP').attr('id');
        if (typeof div === 'undefined') {
            div = $('#div_uneEtape_compoFamilleChambre').attr('id');
        }
        var divTarifs;
        var qte;
        switch (div) {
            case'div_uneEtape_hotelChoixChambre':
                etapeValide = false;
                $('.tr_tarifHotel').each(function () {
                    $(this).find('.sp_msgErreurAdultes').hide();
                    $(this).removeClass('invalide');
                    var nbAdultes = $(this).find('.select_nbAdultesHotel').val();
                    var nbEnfants = 0;
                    if ($(this).find('.select_nbEnfantsHotel').length > 0) {
                        nbEnfants = $(this).find('.select_nbEnfantsHotel').val();
                    }
                    if (nbAdultes == 0 && nbEnfants > 0) {
                        $(this).addClass('invalide');
                        $(this).find('.sp_msgErreurAdultes').show();
                    }
                    if (nbAdultes > 0) {
                        etapeValide = true;
                    }
                });
                break;
            case'div_uneEtape_locatChoixChambre':
                etapeValide = false;
                $('.tr_tarifLocat').each(function () {
                    $(this).removeClass('invalide');
                    var nbAdultes = $(this).find('.select_nbAdultesLocat').val();
                    var nbEnfants = 0;
                    if ($(this).find('.select_nbEnfantsLocat').length > 0) {
                        nbEnfants = $(this).find('.select_nbEnfantsLocat').val();
                    }
                    if (nbAdultes == 0 && nbEnfants > 0) {
                        $(this).addClass('invalide');
                    }
                    if (nbAdultes > 0) {
                        etapeValide = true;
                    }
                });
                break;
            case'div_uneEtape_choixNDate':
                qte = 0;
                $('.td_ndateQuantite select').each(function () {
                    qte += $(this).val();
                });
                if (qte == 0) {
                    etapeValide = false;
                } else {
                    etapeValide = true;
                }
                break;
            case'div_uneEtape_billetChoixPresta':
                divTarifs = $('#' + div);
                qte = 0;
                $('.tr_tarifBillet').each(function () {
                    qte += $(this).find('.select_qteBillet').val();
                });
                if (qte == 0) {
                    etapeValide = false;
                } else {
                    etapeValide = true;
                }
                break;
            case'div_uneEtape_voitureChoixPresta':
                etapeValide = false;
                $('.tr_tarifVoiture').each(function () {
                    $(this).removeClass('invalide');
                    var qte = $(this).find('.select_qteVoiture').val();
                    if (qte > 0) {
                        etapeValide = true;
                    } else {
                        $(this).addClass('invalide');
                    }
                });
                break;
            case'div_uneEtape_packageChoixTarif':
                qte = 0;
                $('#' + div).find('.select_compoNbPers').each(function () {
                    qte += $(this).val();
                });
                if (qte == 0) {
                    etapeValide = false;
                } else {
                    etapeValide = true;
                }
                break;
            case'div_uneEtape_compoFamilleChambre':
                etapeValide = true;
                var nbAdultes = 0;
                $('#div_uneEtape_compoFamilleChambre .select_compoFamilleAdulte').each(function () {
                    nbAdultes += parseInt($(this).val());
                });
                if (nbAdultes === 0) {
                    etapeValide = false;
                    break;
                }
                if (!estResaGP()) {
                    break;
                }
                var nbEnfantsDansUneChambre;
                var compoChambreOk = true;
                $('#div_uneEtape_compoFamilleChambre .select_compoFamilleEnfant').each(function () {
                    nbEnfantsDansUneChambre = parseInt($(this).val());
                    if (nbEnfantsDansUneChambre > 0) {
                        var nbAdultesDansUneChambre = parseInt($(this).parents('.div_uneChambre').find('.select_compoFamilleAdulte').val());
                        if (nbAdultesDansUneChambre === 0) {
                            compoChambreOk = false;
                            return false;
                        }
                    }
                });
                if (!compoChambreOk) {
                    etapeValide = false;
                }
                break;
        }
        var recapPrixOk = true;
        if ($('#div_recapPrix #p_msgErreur').length > 0) {
            recapPrixOk = false;
        }
        if (etapeValide && recapPrixOk) {
            $('#' + div).find('.inpt_validEtape').val('Oui');
        } else {
            $('#' + div).find('.inpt_validEtape').val('Non');
        }
    })(jQuery);
}
function verifMontantNullResaBureau() {
    var verif = true;
    (function ($) {
        if ($('#input_prixModifieBureau') && $('#input_okPrixModifieBureau')) {
            var val = $('#input_prixModifieBureau').val();
            var forcage = $('#input_okPrixModifieBureau').val();
            if (val <= 0 && forcage == 0) {
                $("#div_confirmMontantNullResaBureau").dialog({autoOpen: false, width: 500, modal: true});
                $('#div_confirmMontantNullResaBureau').dialog("option", "buttons", {
                    "Continuer": function () {
                        $('#input_okPrixModifieBureau').val(1);
                        $("#div_btnConfirmer > a:not(.a_btnAttenteConfirm)").click();
                        $(this).dialog("close");
                    }, "Annuler": function () {
                        $(this).dialog("close");
                    }
                });
                $('#div_confirmMontantNullResaBureau').dialog('open');
                verif = false;
            }
        }
    })(jQuery);
    return verif;
}
function verifChoixHeureVoiture() {
    var verif = true;
    (function ($) {
        if ($('.select_heureVoiture:visible').length > 0) {
            $('.select_heureVoiture:visible').each(function () {
                if ($(this).val() == 0) {
                    var identifiant = $(this).attr('data-identifiant');
                    var message = $('.sp_msgErrHeureVoiture[data-identifiant="' + identifiant + '"]').text();
                    message = "- " + message;
                    if ($("#div_msgErreurs:visible").length == 0) {
                        $("#p_msgErreurs").html(message);
                        $("#div_msgErreurs").show();
                    }
                    else {
                        $("#p_msgErreurs").append("<br />");
                        $("#p_msgErreurs").append(message);
                    }
                    document.location = "#div_msgErreurs";
                    verif = false;
                }
            });
        }
    })(jQuery);
    return verif;
}
function initModifEtape() {
    (function ($) {
        $(".a_modifEtape").click(function () {
            $(this).siblings("h3").find(".sp_lblEtape").validationEngine("hide");
            $(this).parents(".div_uneEtape").find(".div_uneEtapeRecap").hide("slow");
            $(".div_uneEtapeCurr").removeClass('div_uneEtapeCurr');
            $(this).parents(".div_uneEtape").addClass('div_uneEtapeCurr');
            $(this).parents(".div_uneEtape").find(".div_uneEtapeContent").show("slow", function () {
                $(this).parents(".div_uneEtape").find(".div_uneEtapeContent").css("overflow", "");
            });
            $(this).hide();
        });
    })(jQuery);
}
function setEventsForNDate() {
    (function ($) {
        $('.td_ndateQuantite select').change(function () {
            var qte = 0;
            $('.td_ndateQuantite select').each(function () {
                qte += $(this).val();
            });
            if (qte == 0) {
                majLstCanevasOblig(0);
                activeCanevasAvecTarifForfaitaire();
            } else {
                setLignesFactures_ndate();
            }
        });
        if ($("#div_uneEtape_canevas").length > 0) {
            initCanevasResaCouplee(1);
        }
    })(jQuery);
}
function setEventsForPack() {
    (function ($) {
        $('.select_compoNbPers').live('change', function () {
            var qte = $(this).find('option:selected').attr('data-qte');
            if (qte > 0) {
                $(this).parents('.div_unTarifContent').find('.div_unTarifComposants').show();
            } else {
                $(this).parents('.div_unTarifContent').find('.div_unTarifComposants').hide();
            }
            var qteTotal = 0;
            $('.select_compoNbPers').each(function () {
                qteTotal += parseInt($(this).find('option:selected').attr('data-qte'));
            });
            if (qteTotal > 0) {
                setLignesFactures_package();
            } else {
                $('#div_recapPrix').hide();
            }
        });
        $('.a_choixAlternatives').live('click', function () {
            var divARemplir = $(this).parents('.div_unComposant').find('.div_unComposantAlternatives');
            var divDetailComposant = $(this).parents('.div_unComposant').find('.div_detailComposant');
            if (divARemplir.html().length > 0) {
                if (divARemplir.is(':visible')) {
                    divARemplir.hide();
                    divDetailComposant.show();
                } else {
                    divARemplir.show();
                    selectionneTarifSelectDansAlternatives(divARemplir);
                    divDetailComposant.hide();
                }
            } else {
                var btnsAlternatives = $(this).parents('.div_unTarifComposants').find('.a_choixAlternatives');
                btnsAlternatives.each(function () {
                    var idTarif = $(this).parents('.div_unTarif').find('.inpt_idTarif').val();
                    var idComposant = $(this).parents('.div_unComposant').attr('data-idcomposant');
                    var divAlternative = $(this).parents('.div_unComposant').find('.div_unComposantAlternatives');
                    $.ajax({
                        type: 'POST',
                        url: urlAJAX,
                        data: {type: 'getHTML_choixAlternatives', idTarif: idTarif, idComposant: idComposant},
                        beforeSend: function () {
                            divDetailComposant.hide();
                            divARemplir.show();
                            divARemplir.html(txtAttente);
                        },
                        success: function (result) {
                            var tabResult = XMLToArray(result);
                            if (tabResult.code === 'OK') {
                                divAlternative.html(tabResult.html);
                                selectionneTarifSelectDansAlternatives(divARemplir);
                            }
                        }
                    });
                });
            }
        });
        $('.a_btnChoixAlternative').live('click', function () {
            affecteAlternative($(this));
            setLignesFactures_package();
        });
        $(".affichePlusAlternative a").live('click', function () {
            $(".div_detailAlternative.masque").show();
            $(this).hide();
        });
        $(".a_linkDetailAlternativeFancyBox").fancybox({
            fitToView: false,
            width: '80%',
            height: '80%',
            autoSize: false,
            closeClick: false,
            closeEffect: 'none'
        });
    })(jQuery);
}
function selectionneTarifSelectDansAlternatives(divAlternatives) {
    (function ($) {
        var idTarifComposant = divAlternatives.parents('.div_unComposant').attr('data-idtarif');
        divAlternatives.find('.div_detailAlternative').each(function () {
            var idTarif = $(this).find('.a_btnChoixAlternative').attr('data-idtarif')
            if (idTarif == idTarifComposant) {
                $(this).addClass('selected');
            } else {
                $(this).removeClass('selected');
            }
        });
    })(jQuery);
}
function affecteAlternative(elemBtn) {
    (function ($) {
        var libelleComposant = elemBtn.attr('data-libelle');
        var idComposant = elemBtn.attr('data-idtarif');
        var srcImage = elemBtn.attr('data-image');
        var linkToFiche = elemBtn.attr('data-linkfiche');
        var prix = elemBtn.attr('data-prix');
        elemBtn.parents('.div_unComposantAlternatives').hide();
        if (elemBtn.parents('.div_unComposant').attr('data-idtarif') != idComposant) {
            elemBtn.parents('.div_unComposant').attr('data-idtarif', idComposant);
            elemBtn.parents('.div_unComposant').find('.div_detailComposant').find('.titreComposant').text(libelleComposant);
            elemBtn.parents('.div_unComposant').find('.div_detailComposant').find('.div_composantVignette img').attr('src', srcImage);
            elemBtn.parents('.div_unComposant').find('.div_detailComposant').find('.a_lnkToFiche').attr('href', linkToFiche);
            elemBtn.parents('.div_unComposant').find('.div_detailComposant').find('.sp_prixComposant').text(prix);
        }
        elemBtn.parents('.div_unComposant').find('.div_detailComposant').show();
    })(jQuery);
}
function setEventsForVoiture() {
    (function ($) {
        $('.select_qteVoiture').live('change', function () {
            var qte = $(this).val();
            if (qte > 0) {
                setLignesFactures_voiture();
            } else {
                $('#div_recapPrix').hide();
            }
        });
        $('.select_heureVoiture').live('change', function () {
            setLignesFactures_voiture();
        });
    })(jQuery);
}
function setLignesFactures_package() {
    (function ($) {
        var lignesFactures = new Array();
        var i = 0;
        $(".div_unTarifComposants").each(function () {
            var tarifs = new Array();
            var decomptes = new Array();
            var nbEnfants = 0;
            var listeNbPers = $(this).parents('.div_unTarifContent').find(".div_unTarifSelection .select_compoNbPers");
            var nbAdultes = listeNbPers.val();
            var nbPax = nbAdultes;
            var qte = listeNbPers.find('option:selected').attr('data-qte');
            var codeStock = '';
            var idTarif = $(this).find('.inpt_idTarif').val();
            var divComposants = $(this).find(".div_unComposant");
            var j = 0;
            divComposants.each(function () {
                var idComposant = $(this).attr('data-idcomposant');
                var idTarifCompo = $(this).attr('data-idtarif');
                decomptes[j] = new Array(idComposant, idTarifCompo);
                j++;
            });
            tarifs[0] = new Array(idTarif, nbPax, qte, decomptes);
            lignesFactures[i] = new Array(codeStock, nbAdultes, nbEnfants, tarifs);
            i++;
        });
        $.ajax({
            type: "POST",
            url: urlAJAX,
            data: {type: "setLignesFactures", lignesFactures: lignesFactures},
            beforeSend: function () {
                affMsgAttenteParDessusInDiv("div_recapPrix", "recapPrix", txtAttente);
            },
            success: function (result) {
                var tabResult = XMLToArray(result);
                if (tabResult.code == "OK") {
                    if (tabResult.recapPrix) {
                        afficheEffaceRecapPrix_Prod(tabResult);
                    } else {
                        $("#div_recapInfos").html(tabResult.recapInfos);
                        $("#div_recapPrix").hide();
                    }
                    if (tabResult.nbPers) {
                        majLstCanevasOblig(tabResult.nbPers);
                    }
                } else {
                    $("#div_recapPrix").html(tabResult.msg).show();
                }
            }
        });
    })(jQuery);
}
function setLignesFactures_ndate() {
    (function ($) {
        var lignesFactures = new Array();
        var i = 0;
        $('.tr_tarifNDate').each(function () {
            var tarifs = new Array();
            var codeStock = $(this).find(".inpt_codeStock").val();
            var idTarif = $(this).find(".inpt_idTarif").val();
            var qte = $(this).find(".td_ndateQuantite select").val();
            tarifs[0] = new Array(idTarif, qte);
            var codeProd = $(this).find(".inpt_codeProd").val();
            lignesFactures[i] = new Array(codeStock, qte, 0, tarifs, '', codeProd);
            i++;
        });
        $('.spanErreurAjax', '.div_uneEtape_prodGP').remove();
        $.ajax({
            type: "POST",
            url: urlAJAX,
            data: {type: "setLignesFactures", lignesFactures: lignesFactures},
            beforeSend: function () {
                affMsgAttenteParDessusInDiv("div_recapPrix", "recapPrix", txtAttente);
            },
            success: function (result) {
                var tabResult = XMLToArray(result);
                if (tabResult.code == "OK") {
                    if (tabResult.recapPrix) {
                        afficheEffaceRecapPrix_Prod(tabResult);
                    } else {
                        $("#div_recapInfos").html(tabResult.recapInfos);
                        $("#div_recapPrix").hide();
                    }
                    effaceMsgAttenteParDessus("recapPrix");
                }
                else {
                    $("#div_recapPrix").html('<p>' + tabResult.msg + '</p>').show();
                    $('.div_uneEtape_prodGP').append('<span style="display:none;" class="spanErreurAjax" >' + tabResult.msg + '</span>');
                }
            }
        });
    })(jQuery);
}
function setLignesFactures_voiture() {
    (function ($) {
        var lignesFactures = new Array();
        var i = 0;
        $(".tr_tarifVoiture:visible").each(function () {
            var tarifs = new Array();
            var codeStock = $(this).attr("data-codestock");
            var idTarif = $(this).attr("data-idtarif");
            var nbAdultes = 0;
            var nbEnfants = 0;
            var j = 0;
            var commLF = '';
            if ($(this).find(".select_qteVoiture").length > 0) {
                nbAdultes = $(this).find(".select_qteVoiture").val();
                nbEnfants = 0;
            }
            var nbPax = parseInt(nbAdultes) + parseInt(nbEnfants);
            if (nbPax > 0) {
                tarifs[j] = new Array(idTarif, nbPax);
                j++;
            }
            if ($(this).find('.td_heurePriseVoiture').length > 0) {
                commLF += $(this).find('.td_heurePriseVoiture .select_heureVoiture').val();
            }
            if ($(this).find('.td_heureDepotVoiture').length > 0) {
                commLF += '-';
                commLF += $(this).find('.td_heureDepotVoiture .select_heureVoiture').val();
            }
            lignesFactures[i] = new Array(codeStock, nbAdultes, nbEnfants, tarifs, commLF);
            i++;
        });
        $.ajax({
            type: "POST",
            url: urlAJAX,
            data: {type: "setLignesFactures", lignesFactures: lignesFactures},
            beforeSend: function () {
                affMsgAttenteParDessusInDiv("div_recapPrix", "recapPrix", txtAttente);
            },
            success: function (result) {
                var tabResult = XMLToArray(result);
                if (tabResult.code == "OK") {
                    if (tabResult.recapPrix) {
                        afficheEffaceRecapPrix_Prod(tabResult);
                    } else {
                        $("#div_recapInfos").html(tabResult.recapInfos);
                        $("#div_recapPrix").hide();
                    }
                    if (tabResult.nbPers) {
                        majLstCanevasOblig(tabResult.nbPers);
                    }
                    effaceMsgAttenteParDessus("recapPrix");
                }
            }
        });
    })(jQuery);
}
function setEventsForLocat() {
    (function ($) {
        $(".select_nbAdultesLocat").live('change', function () {
            var nbPersMaxi = $(this).parents('.tr_tarifLocat').attr('data-nbmaxi');
            var nbAdultes = $(this).val();
            var nbEnfantsMax = parseInt(nbPersMaxi) - parseInt(nbAdultes);
            var listeEnfants = $(this).parents('.tr_tarifLocat').find('.select_nbEnfantsLocat');
            var idTarif = $(this).parents('.tr_tarifLocat').attr('data-idtarif');
            $('.tr_supplementsTarif').each(function () {
                if ($(this).attr('data-idtarifprod') == idTarif) {
                    if (nbAdultes > 0) {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }
                }
            });
            if (nbEnfantsMax == 0) {
                listeEnfants.hide();
            } else {
                listeEnfants.show();
                listeEnfants.find('option').each(function () {
                    if ($(this).val() > nbEnfantsMax) {
                        $(this).hide();
                    } else {
                        $(this).show();
                    }
                });
            }
            var nbAdultesTot = 0;
            $('.select_nbAdultesLocat:visible').each(function () {
                if ($(this).val() > 0) {
                    nbAdultesTot += $(this).val();
                }
            });
            if (nbAdultesTot == 0) {
                $('#div_uneEtape_locatChoixChambre').find('.inpt_validEtape').val('Non');
                $('#div_recapPrix').hide();
                $('#div_recapInfosFamille').remove();
            }
            else {
                setLignesFactures_locat();
            }
            var nbEnfants = listeEnfants.val();
            var nbPax = parseInt(nbAdultes) + parseInt(nbEnfants);
            majListesSupplementsLocat(idTarif, nbPax);
        });
        $(".select_nbEnfantsLocat").live('change', function () {
            var nbEnfants = $(this).val();
            var nbAdultes = $(this).parents('.tr_tarifLocat').find('.select_nbAdultesLocat').val();
            var nbPersMaxi = $(this).parents('.tr_tarifLocat').attr('data-nbmaxi');
            var nbAdultesMax = parseInt(nbPersMaxi) - parseInt(nbEnfants);
            var listeAdultes = $(this).parents('.tr_tarifLocat').find('.select_nbAdultesLocat');
            listeAdultes.find('option').each(function () {
                if ($(this).val() > nbAdultesMax) {
                    $(this).hide();
                } else {
                    $(this).show();
                }
            });
            if (nbAdultes > 0) {
                setLignesFactures_locat();
            }
            var idTarif = $(this).parents('.tr_tarifLocat').attr('data-idtarif');
            var nbPax = parseInt(nbAdultes) + parseInt(nbEnfants);
            majListesSupplementsLocat(idTarif, nbPax);
        });
        setEventsSupplements(setLignesFactures_locat);
        $('.a_btnChoixTarif').live('click', function () {
            var div = $(this).attr('data-div');
            var divTarif = $('.' + div + '.divDeBase').clone();
            $(this).parents('.div_uneChambre_choixTarif').after(divTarif);
            divTarif.removeClass('divDeBase').show();
            $(this).parents('.div_uneChambre_choixTarif').hide();
        });
        $('.a_modifTarif').live('click', function () {
            $(this).parents('.div_uneChambreTarifs').prev().show();
            $(this).parents('.div_uneChambreTarifs').remove();
        });
    })(jQuery);
}
function setEventsForBillet() {
    (function ($) {
        $(".select_qteBillet").live("change", function () {
            var nbPers = 0;
            $('.select_qteBillet:visible').each(function () {
                if ($(this).val() > 0) {
                    nbPers += $(this).val();
                }
            });
            if (nbPers == 0) {
                $('#div_uneEtape_billetChoixPresta').find('.inpt_validEtape').val('Non');
                $('#div_recapPrix').hide();
                $('#div_recapInfosFamille').remove();
            }
            else {
                setLignesFactures_billet();
            }
        });
    })(jQuery);
}
function majNumEtapes() {
    (function ($) {
        var numEtape = 1;
        $('.sp_numEtape:visible').each(function () {
            $(this).text(numEtape);
            numEtape++;
        });
    })(jQuery);
}
function initEtape1_panier() {
    (function ($) {
        idSession = getIdSessionInHtml();
        var demandePrix = false;
        $('.td_ndateQuantite > select').each(function () {
            if ($(this).val() > 0) {
                demandePrix = true;
            }
        });
        if (demandePrix) {
            $('.td_ndateQuantite').first().find('select').change();
        }
    })(jQuery);
}
function afficheEffaceRecapPrix_Prod(tabResult) {
    (function ($) {
        var html_recapPrix = tabResult.recapPrix;
        var html_choixAssurance = tabResult.choixAssurance;
        $("#div_recapPrix").html(html_recapPrix).show();
        $("#div_recapInfosEtPrix").show();
        majAssurance(null, html_choixAssurance);
        majNumEtapes();
        initAssurance();
        initModifEtape();
        $("#div_recapInfos").html(tabResult.recapInfos);
        if ($("#div_uneEtape_assuranceAnnul").not(':visible')) {
            $('.p_recapInfosAssur').hide();
        }
        $(".div_uneEtapeGrisee *").attr("disabled", false);
        $('.div_uneEtapeGrisee').removeClass('div_uneEtapeGrisee');
        if (tabResult.nbPers) {
            majLstCanevasOblig(tabResult.nbPers);
            activeCanevasAvecTarifForfaitaire();
        }
        if (tabResult.motsMagiques == 'Oui') {
            $('#div_uneEtape_motMagique').show();
        }
        var messageDevis = tabResult.msgInfoModeResa || '';
        if (messageDevis) {
            $('.infosModeResa').html(messageDevis);
            $('.infosModeResa').show();
            $('#sp_lblRecapDates').parent().hide();
        }
    })(jQuery);
}
function majRubriqueCanevasAvecElementNonCumulable(obj) {
    (function ($) {
        if (obj.is(':checked') || obj.val() != 0) {
            obj.parents('.tarifElementRubriqueCanevas').addClass('selected');
            obj.parents('.liste_tarifs_de_la_rubrique').find('.tarifElementRubriqueCanevas:not(.selected) *').attr("disabled", true);
        } else {
            obj.parents('.tarifElementRubriqueCanevas').removeClass('selected');
            obj.parents('.liste_tarifs_de_la_rubrique').find('.tarifElementRubriqueCanevas *').attr("disabled", false);
        }
    })(jQuery);
}
function activeCanevasAvecTarifForfaitaire() {
    (function ($) {
        if ($("#div_uneEtape_canevas").length > 0) {
            var nbPers = $('.divUneRubriqueCanevas').first().attr('data-nbpers');
            if (nbPers > 0) {
                $('.inpt_choixQteCanevas_forfait').not('.obligatoire').attr('disabled', false);
            } else {
                $('.inpt_choixQteCanevas_forfait').attr('disabled', true);
            }
        }
    })(jQuery);
}
function initBtnGoogle() {
    (function ($) {
        var googleAppID = $('#div_btnConnexionGoogle').attr('data-appid');
        gapi.signin.render('div_btnConnexionGoogle', {
            'clientid': googleAppID,
            'cookiepolicy': 'single_host_origin',
            'requestvisibleactions': 'http://schemas.google.com/AddActivity',
            'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/plus.me',
            'callback': 'connexionGooglePlus'
        });
    })(jQuery);
}
function connexionGooglePlus(retour) {
    (function ($) {
        if (retour['access_token']) {
            $('.div_connexionReseau:not(".div_connexionGoogle")').hide();
            $('.sp_infosConnexionGoogle').show();
            $('#sp_deconnecteGoogle').attr('data-token', retour['access_token']);
            gapi.client.load('plus', 'v1', function () {
                gapi.client.plus.people.get({'userId': 'me'}).execute(function (objPers) {
                    majFormClient_googlePlus(objPers);
                });
            });
        } else if (retour['error']) {
        }
    })(jQuery);
}
function majFormClient_googlePlus(obj) {
    (function ($) {
        if (obj.emails) {
            var tabEmails = obj.emails;
            for (i = 0; i < tabEmails.length; i++) {
                if (tabEmails[i].type == 'account') {
                    $('#inpt_mailClient').val(tabEmails[i].value);
                    $('#inpt_confirmMailClient').val(tabEmails[i].value);
                }
            }
        }
        if (obj.name) {
            $('#inpt_nomClient').val(obj.name.familyName);
            $('#inpt_prenomClient').val(obj.name.givenName);
        }
        if (obj.gender) {
            if (obj.gender == 'male') {
                $('#select_civiliteClient').val(1);
            } else if (obj.gender == 'female') {
                $('#select_civiliteClient').val(2);
            }
        }
        if (obj.language && obj.language != 'fr') {
        }
        if (obj.placesLived) {
            var tabAdresses = obj.placesLived;
            for (i = 0; i < tabAdresses.length; i++) {
                if (tabAdresses[i].primary) {
                    $('#inpt_villeClient').val(tabAdresses[i].value);
                }
            }
        }
    })(jQuery);
}
function deconnecteGoogle(access_token) {
    (function ($) {
        var revokeUrl = 'https://accounts.google.com/o/oauth2/revoke?token=' + access_token;
        $.ajax({
            type: 'GET',
            url: revokeUrl,
            async: false,
            contentType: "application/json",
            dataType: 'jsonp',
            success: function (nullResponse) {
                document.location.reload();
            },
            error: function (e) {
            }
        });
    })(jQuery);
}
function connexionFacebook() {
    (function ($) {
        FB.login(function (response) {
            if (response.authResponse) {
                $('.div_connexionReseau:not(".div_connexionFacebook")').hide();
                $('.sp_infosConnexionFacebook').show();
                majFormClient_facebook();
            } else {
                $('.div_connexionReseau').show();
                $('.sp_infosConnexionFacebook').hide();
            }
        }, {scope: 'public_profile,email,user_hometown,user_location'});
    })(jQuery);
}
function majFormClient_facebook() {
    (function ($) {
        FB.api('/me', function (response) {
            if (response.email) {
                $('#inpt_mailClient').val(response.email);
                $('#inpt_confirmMailClient').val(response.email);
            }
            if (response.first_name) {
                $('#inpt_nomClient').val(response.first_name);
            }
            if (response.last_name) {
                $('#inpt_prenomClient').val(response.last_name);
            }
            if (response.gender) {
                if (response.gender == 'male') {
                    $('#select_civiliteClient').val(1);
                } else if (response.gender == 'female') {
                    $('#select_civiliteClient').val(2);
                }
            }
            if (response.hometown) {
                var ville = response.hometown.name;
                if (ville.indexOf(',') != -1) {
                    ville = ville.substr(0, ville.indexOf(','));
                }
                $('#inpt_villeClient').val(ville);
            } else if (response.location) {
                var ville = response.location.name;
                if (ville.indexOf(',') != -1) {
                    ville = ville.substr(0, ville.indexOf(','));
                }
                $('#inpt_villeClient').val(ville);
            }
        });
    })(jQuery);
}
function chargeAlternatives() {
    (function ($) {
        var btnsAlternatives = $('.a_choixAlternatives');
        btnsAlternatives.each(function () {
            var divARemplir = $(this).parents('.div_unComposant').find('.div_unComposantAlternatives');
            var idTarif = $(this).parents('.div_unTarif').find('.inpt_idTarif').val();
            var idComposant = $(this).parents('.div_unComposant').attr('data-idcomposant');
            var divAlternative = $(this).parents('.div_unComposant').find('.div_unComposantAlternatives');
            $.ajax({
                type: 'POST',
                url: urlAJAX,
                data: {type: 'getHTML_choixAlternatives', idTarif: idTarif, idComposant: idComposant},
                beforeSend: function () {
                    divARemplir.html(txtAttente);
                },
                success: function (result) {
                    var tabResult = XMLToArray(result);
                    if (tabResult.code === 'OK') {
                        divAlternative.html(tabResult.html);
                    }
                }
            });
        });
    })(jQuery);
}
function setEventsSupplements(foncPrix) {
    (function ($) {
        $(".select_qteSupplement").live('change', function () {
            foncPrix();
        });
        $('.select_supplementForfaitaire').live('change', function () {
            foncPrix();
        });
    })(jQuery);
}
function majListesSupplementsHotel() {
    (function ($) {
        var nbPax = 0;
        var nbAdultes;
        var nbEnfants;
        var nbPaxSelected;
        var htmlOption;
        var selected = '';
        $('.select_nbAdultesHotel').each(function () {
            nbAdultes = parseInt($(this).val());
            nbPax += nbAdultes;
        });
        $('.select_nbEnfantsHotel').each(function () {
            nbEnfants = parseInt($(this).val());
            nbPax += nbEnfants;
        });
        $('.select_qteSupplement').each(function () {
            nbPaxSelected = $(this).val();
            $(this).html('');
            if (nbPaxSelected > nbPax) {
                nbPaxSelected = nbPax;
            }
            for (var i = 0; i <= nbPax; i++) {
                if (i == nbPaxSelected) {
                    selected = 'selected="selected"';
                } else {
                    selected = '';
                }
                htmlOption = '<option value="' + i + '" ' + selected + '>' + i + '</option>';
                $(this).append(htmlOption);
            }
        });
    })(jQuery);
}
function majListesSupplementsLocat(idTarif, nbPax) {
    (function ($) {
        var nbPaxSelected;
        var selected;
        var htmlOption;
        $('.tr_tarifSupplement').each(function () {
            if ($(this).attr('data-idtarifprod') == idTarif) {
                if ($(this).find('.select_qteSupplement').length > 0) {
                    $(this).find('.select_qteSupplement').each(function () {
                        nbPaxSelected = $(this).val();
                        $(this).html('');
                        for (var i = 0; i <= nbPax; i++) {
                            if (i == nbPaxSelected) {
                                selected = 'selected="selected"';
                            } else {
                                selected = '';
                            }
                            htmlOption = '<option value="' + i + '" ' + selected + '>' + i + '</option>';
                            $(this).append(htmlOption);
                        }
                    });
                }
            }
        });
    })(jQuery);
}
function verifNbPaxCodeStock_hotel(codestock) {
    (function ($) {
        var stockDispoTotal = null;
        var nbAdultes;
        var nbEnfants;
        var nbPax;
        var stockDispo;
        var nbChambres;
        var nbMaxChambre;
        $('.tr_tarifHotel').each(function () {
            if ($(this).attr('data-codestock') == codestock) {
                nbAdultes = $(this).find('.select_nbAdultesHotel').val();
                if ($(this).find('.select_nbEnfantsHotel').length > 0) {
                    nbEnfants = $(this).find('.select_nbEnfantsHotel').val();
                } else {
                    nbEnfants = 0;
                }
                nbPax = parseInt(nbAdultes) - parseInt(nbEnfants);
                nbMaxChambre = parseInt($(this).attr('data-nbmaxchambre'));
                nbChambres = Math.ceil(nbPax / nbMaxChambre);
                stockDispo = $(this).attr('data-stockdispo');
                if (stockDispoTotal === null) {
                    stockDispoTotal = stockDispo - nbChambres;
                } else {
                    stockDispoTotal = stockDispoTotal - nbChambres;
                }
                if (nbChambres > 0) {
                    $(this).addClass('selected');
                } else {
                    $(this).removeClass('selected');
                }
            }
        });
        $('.tr_tarifHotel').each(function () {
            if ($(this).attr('data-codestock') == codestock && !$(this).hasClass('selected')) {
                if (stockDispoTotal <= 0) {
                    $(this).find('input,select').attr('disabled', true);
                    $(this).addClass('chambreGrisee');
                } else {
                    $(this).find('input,select').attr('disabled', false);
                    $(this).removeClass('chambreGrisee');
                }
            }
        });
    })(jQuery);
}
function initDescTarifQTip() {
    (function ($) {
        if ($('.img_descTarifAvecQTip').length > 0) {
            $('.viewWithQtipTohide').hide();
            $('.img_descTarifAvecQTip').each(function () {
                if ($(this).attr('data-text') && $("#" + $(this).attr('data-text'))) {
                    $(this).qtip({
                        content: {
                            text: $("#" + $(this).attr('data-text')).html(),
                            title: {text: $(this).attr('data-titre')}
                        }, show: 'mouseover', hide: 'mouseout'
                    });
                }
            });
        }
    })(jQuery);
}
function initEtape1_2() {
    (function ($) {
        $.ajaxSetup({timeout: 100000});
        initEtape2();
        majNumEtapes();
        if ($('#div_uneEtape_compoFamilleGite').length > 0 && $('#div_uneEtape_compoFamilleGite').find('.inpt_validEtape').val() != 'Oui') {
            $('#div_uneEtape_dejaClient').addClass('div_uneEtapeGrisee');
            $('#div_uneEtape_nouveauClient').addClass('div_uneEtapeGrisee');
        }
        if ($('#div_uneEtape_compoFamilleChambre').length > 0 && $('#div_uneEtape_compoFamilleChambre').find('.inpt_validEtape').val() != 'Oui') {
            $('#div_uneEtape_dejaClient').addClass('div_uneEtapeGrisee');
            $('#div_uneEtape_nouveauClient').addClass('div_uneEtapeGrisee');
        }
        $('#div_btnConfirmer_2etapes').click(function () {
            $('#div_btnConfirmer_1 > a').click();
        });
    })(jQuery);
}
function setHeuresArriveeDepart() {
    (function ($) {
        var heureArrivee = $('#inpt_heureArrivee').val();
        var heureDepart = $('#inpt_heureDepart').val();
        var pattern = /([0-9]{1,2}[h|H][0-9]{0,2})/;
        var regex = new RegExp(pattern);
        if (regex.test(heureArrivee) && regex.test(heureDepart)) {
            $('#sp_msgErrHoraires').hide();
            $.ajax({
                type: 'POST',
                url: urlAJAX,
                data: {type: 'setHeuresArriveeDepart', heureArrivee: heureArrivee, heureDepart: heureDepart},
                success: function (result) {
                    eval('var tabRetour=' + result);
                    $('#div_recapInfos').html(tabRetour.recapInfos);
                }
            });
        } else {
            $('#sp_msgErrHoraires').show();
        }
    })(jQuery);
}
function initModifPrixResaBureau() {
    (function ($) {
        if ($('#div_btnModifPrix').length > 0) {
            $("#div_modifPrixResaBureau").dialog({autoOpen: false, width: 500, modal: true});
            $('#div_btnModifPrix a').live('click', function () {
                $.ajax({
                    type: 'POST',
                    url: urlAJAX,
                    data: {type: 'getHTML_popinModifPrixResaBureau'},
                    success: function (result) {
                        var tabRetour = XMLToArray(result);
                        $('#div_modifPrixResaBureau').html(tabRetour.html);
                        $('#div_modifPrixResaBureau').dialog('open');
                        initDatepickerDateLimite();
                        initCalculsModifPrixResaBureau();
                        calculsModifPrixResaBureau();
                    }
                });
            });
            $('#div_modifPrixResaBureau').dialog("option", "buttons", {
                "Annuler": function () {
                    $(this).dialog("close");
                }, "Valider": function () {
                    var BtValider = $(this);
                    var tabPrix = new Array();
                    var i = 0;
                    $('.inpt_modifPrixResaBureau').each(function () {
                        var nom = $(this).attr('name');
                        var valeur = $(this).val();
                        tabPrix[i] = new Array(nom, valeur);
                        i++;
                    });
                    $.ajax({
                        type: 'POST',
                        url: urlAJAX,
                        data: {type: 'enregistreNouveauxPrix', tabPrix: tabPrix},
                        success: function (result) {
                            var tabResult = XMLToArray(result);
                            if (tabResult.code === 'KO') {
                                if (tabResult.msg.length > 0) {
                                    $('#div_msgErreurModifPrix p.p_msgErrResaProp').html(tabResult.msg);
                                    $('#div_msgErreurModifPrix').show();
                                    return false;
                                }
                                BtValider.dialog("close");
                            }
                            afficheEffaceRecapPrix(tabResult);
                            BtValider.dialog("close");
                        }
                    });
                }
            });
        }
    })(jQuery);
}
function initDatepickerDateLimite() {
    (function ($) {
        $('.inpt_modifPrixResaBureau[name="dateLimite"]').datepicker({minDate: 0});
    })(jQuery);
}
function initCalculsModifPrixResaBureau() {
    (function ($) {
        $('.inpt_modifPrixResaBureau').live('keyup', function () {
            calculsModifPrixResaBureau();
        });
    })(jQuery);
}
function calculsModifPrixResaBureau() {
    (function ($) {
        var total = recalculPrixTotalResaBureau();
        $('#sp_prixTotalModif').text(total);
        $('.inpt_modifPrixResaBureau[name="total"]').val(total);
        if ($('.inpt_modifPrixResaBureau[name="prixLocation"]').length > 0) {
            if (getValeurChampModifPrix('promotion') > 0) {
                $('.inpt_modifPrixResaBureau[name="tauxRemise"]').attr('disabled', 'disabled');
            } else {
                $('.inpt_modifPrixResaBureau[name="tauxRemise"]').removeAttr('disabled');
            }
            if (getValeurChampModifPrix('tauxRemise') > 0) {
                $('.inpt_modifPrixResaBureau[name="promotion"]').attr('disabled', 'disabled');
            } else {
                $('.inpt_modifPrixResaBureau[name="promotion"]').removeAttr('disabled');
            }
        }
    })(jQuery);
}
function recalculPrixTotalResaBureau() {
    var total = 0;
    (function ($) {
        var prixLocation = 0;
        if ($('.inpt_modifPrixResaBureau[name="prixLocation"]').length > 0) {
            prixLocation = getValeurChampModifPrix('prixLocation');
        } else if ($('.inpt_modifPrixResaBureau.prixChambre').length > 0) {
            $('.inpt_modifPrixResaBureau.prixChambre').each(function () {
                prixLocation += getValeurChampModifPrix($(this).attr('name'));
            });
        }
        var assurAnnul = getValeurChampModifPrix('assurAnnul');
        var fraisDossier = getValeurChampModifPrix('fraisDossier');
        var charges = getValeurChampModifPrix('charges');
        var promotion = getValeurChampModifPrix('promotion');
        var remise = getValeurChampModifPrix('tauxRemise') * prixLocation / 100;
        var totalOption = 0;
        $('.inpt_modifPrixResaBureau[name^=prixOption]').each(function () {
            totalOption += getValeurChampModifPrix($(this).attr('name'));
        });
        total = prixLocation + assurAnnul + fraisDossier + charges + totalOption - promotion - remise;
        total = Math.round(total * 100) / 100;
    })(jQuery);
    return total;
}
function recalculPrixAcompteResaBureau() {
    var acompte;
    var total = getValeurChampModifPrix('total');
    var tauxAcompte = getValeurChampModifPrix('tauxAcompte');
    acompte = total * tauxAcompte / 100;
    acompte = Math.floor(acompte);
    return acompte;
}
function getValeurChampModifPrix(nomChamp) {
    var valeur = 0;
    (function ($) {
        if ($('.inpt_modifPrixResaBureau[name="' + nomChamp + '"]').length > 0 && $('.inpt_modifPrixResaBureau[name="' + nomChamp + '"]').val() != '' && ($('.inpt_modifPrixResaBureau[name="' + nomChamp + '"]').is(':visible') || nomChamp == 'total')) {
            var valeurAvantParse = $('.inpt_modifPrixResaBureau[name="' + nomChamp + '"]').val();
            var regexFloat = new RegExp(/^[0-9]*[\.|,]?[0-9]{0,2}$/);
            if (regexFloat.test(valeurAvantParse)) {
                $('.inpt_modifPrixResaBureau[name="' + nomChamp + '"]').removeClass('erreur');
                valeur = parseFloat(valeurAvantParse.replace(',', '.'));
                var tabNomChamp = nomChamp.split('_');
                if (tabNomChamp[0] == 'prixOption') {
                    valeur = valeur * parseFloat($('#coeffOption_' + tabNomChamp[1]).val());
                }
                if ($('.inpt_modifPrixResaBureau[name="' + nomChamp + '"]').hasClass('pourcentage')) {
                    if (valeur < 0 || valeur > 100) {
                        $('.inpt_modifPrixResaBureau[name="' + nomChamp + '"]').addClass('erreur');
                        valeur = 0;
                    }
                }
            } else {
                $('.inpt_modifPrixResaBureau[name="' + nomChamp + '"]').addClass('erreur');
                valeur = 0;
            }
        }
    })(jQuery);
    return valeur;
}
function initAutocompleteClientsExistants(avecDpt) {
    (function ($) {
        var date;
        var timeKeyUp;
        var xhr;
        $('#inpt_nomClient, #inpt_prenomClient, #inpt_mailClient, #inpt_cpClient, #inpt_telDomClient').keyup(function () {
            if ($('#inpt_prenomClient').val() != '') {
                if ($('#inpt_nomClient').val() == '' && $('#inpt_mailClient').val() == '' && $('#inpt_cpClient').val() == '' && $('#inpt_telDomClient').val() == '') {
                    return false;
                }
            }
            date = new Date();
            timeKeyUp = date.getTime();
            setTimeout(function () {
                date = new Date();
                var time = date.getTime();
                var delai = time - timeKeyUp;
                if (delai >= 800) {
                    xhr = lanceAutocompleteClients(avecDpt);
                }
            }, 800);
        });
        $('#inpt_nomClient, #inpt_prenomClient, #inpt_mailClient, #inpt_cpClient, #inpt_telDomClient').keypress(function () {
            if (xhr !== undefined) {
                xhr.abort();
            }
        });
    })(jQuery);
}
function lanceAutocompleteClients(avecDpt) {
    return (function ($) {
        var nom = $('#inpt_nomClient').val();
        var prenom = $('#inpt_prenomClient').val();
        var mail = $('#inpt_mailClient').val();
        var cp = $('#inpt_cpClient').val();
        var tel = $('#inpt_telDomClient').val();
        var xhr;
        if (nom.length >= 4 || prenom.length >= 4 || mail.length >= 4 || cp.length >= 2 || tel.length >= 6) {
            xhr = $.ajax({
                type: 'POST',
                url: urlAJAX,
                data: {
                    type: 'getHTML_listeClientsForAutocomplete',
                    nom: nom,
                    prenom: prenom,
                    mail: mail,
                    cp: cp,
                    tel: tel,
                    avecDpt: avecDpt
                },
                beforeSend: function () {
                    $('#div_autocompleteClients').html('<img src="/config_v3/imgs_defaut/loading/loader.gif" />');
                },
                success: function (result) {
                    $('#div_autocompleteClients').html(result);
                    $('#div_autocompleteClients').show();
                    initChargeClientExistant();
                },
                complete: function () {
                }
            });
        } else {
            $('#div_autocompleteClients').html('');
        }
        return xhr;
    })(jQuery);
}
function initChargeClientExistant() {
    (function ($) {
        $('.li_autocompleteurClient').click(function () {
            var nom = $(this).find('.inpt_autocompleteClient.nomClient').val();
            var prenom = $(this).find('.inpt_autocompleteClient.prenomClient').val();
            var mail = $(this).find('.inpt_autocompleteClient.mailClient').val();
            var instance = $(this).find('.inpt_autocompleteClient.instance').val();
            var civilite;
            var CP = '';
            var ville = '';
            var adresse1 = '';
            var adresse2 = '';
            var telDom = '';
            var telBur = '';
            var mdp = '';
            var pays = '';
            if ($(this).find('.inpt_autocompleteClient.villeClient').length == 0) {
                $.ajax({
                    type: 'POST',
                    url: urlAJAX,
                    async: false,
                    data: {type: 'getDetailClient', nom: nom, prenom: prenom, mail: mail, instance: instance},
                    success: function (result) {
                        var tabResult = XMLToArray(result);
                        civilite = tabResult.civilite;
                        CP = tabResult.code_postal;
                        ville = tabResult.ville;
                        adresse1 = tabResult.adresse;
                        adresse2 = tabResult.lieu_dit;
                        telDom = tabResult.tel1;
                        telBur = tabResult.tel2;
                        mdp = tabResult.mdp;
                        pays = tabResult.pays || '';
                    }
                });
            } else {
                civilite = $(this).find('.inpt_autocompleteClient.civilite').val();
                CP = $(this).find('.inpt_autocompleteClient.CPClient').val();
                ville = $(this).find('.inpt_autocompleteClient.villeClient').val();
                adresse1 = $(this).find('.inpt_autocompleteClient.adresse1Client').val();
                adresse2 = $(this).find('.inpt_autocompleteClient.adresse2Client').val();
                telDom = $(this).find('.inpt_autocompleteClient.tel1Client').val();
                telBur = $(this).find('.inpt_autocompleteClient.tel2Client').val();
                mdp = $(this).find('.inpt_autocompleteClient.mdp').val();
                pays = $(this).find('.inpt_autocompleteClient.pays').val() || '';
            }
            $('#select_civiliteClient').val(civilite);
            $('#inpt_nomClient').val(nom);
            $('#inpt_prenomClient').val(prenom);
            $('#inpt_cpClient').val(CP);
            $('#inpt_villeClient').val(ville);
            $('#inpt_mailClient').val(mail);
            $('#inpt_adresse1Client').val(adresse1);
            $('#inpt_adresse2Client').val(adresse2);
            $('#inpt_telDomClient').val(telDom);
            $('#inpt_telBurClient').val(telBur);
            $('#inpt_mdpClient').val(mdp);
            if (pays) {
                $('option', $('#select_pays')).attr('selected', false);
                $('option[data-code="' + pays + '"]', $('#select_pays')).attr('selected', true);
            }
            validFormulaire();
            checkChampsImportants();
        });
    })(jQuery);
}
function estResaBureauProp() {
    if (jQuery('#inputTypeClientResaProp').length > 0) {
        return true;
    }
    return false;
}
function estResaBureauGestloc() {
    if (jQuery('#inputTypeClientVendeurBureau').length > 0) {
        return true;
    }
    return false;
}
function estResaGP() {
    if (jQuery('#inputTypeClientGP').length > 0) {
        return true;
    }
    return false;
}
function ajouteOuRemplaceDansDataLayer(objGA) {
    if (typeof(dataLayer) == 'undefined' || typeof(objGA) == 'undefined' || typeof(objGA.event) == 'undefined') {
        return false;
    }
    var eventName = objGA.event;
    jQuery.each(dataLayer, function (id, elemDataLayer) {
        if (typeof(elemDataLayer) != 'undefined' && typeof(elemDataLayer.event) != 'undefined' && elemDataLayer.event == eventName) {
            dataLayer.splice(id, 1);
        }
    })
    dataLayer.push(objGA);
    return true;
}
function enregistrePrixLocationProp(prixLocationProp) {
    (function ($) {
        $.ajax({
            type: 'POST',
            url: urlAJAX,
            async: true,
            data: {type: 'enregistrePrixLocationProp', prixLocation: prixLocationProp},
            success: function (result) {
                var tabRetour = XMLToArray(result);
                afficheEffaceRecapPrix(tabRetour);
            }
        });
    })(jQuery);
}
function reinitSelectionLignesFactures() {
    (function ($) {
        var nbAdultesTot = 0;
        if ($('.selectQuantitePourReinit:visible').length > 0) {
            $('.selectQuantitePourReinit:visible').each(function () {
                if ($(this).val() > 0) {
                    nbAdultesTot += $(this).val();
                }
            });
        }
        var id = $('.div_uneEtape_prodGP').attr('id');
        if (nbAdultesTot === 0) {
            $('#' + id).find('.inpt_validEtape').val('Non');
            $('#div_recapPrix').hide();
            $('#div_recapInfosFamille').remove();
        }
        else {
            switch (id) {
                case'div_uneEtape_hotelChoixChambre':
                    setLignesFactures_hotel();
                    break;
                case'div_uneEtape_choixNDate':
                    setLignesFactures_ndate();
                    break;
                case'div_uneEtape_packageChoixTarif':
                    setLignesFactures_package();
                    break;
                case'div_uneEtape_voitureChoixPresta':
                    setLignesFactures_voiture();
                    break;
                case'div_uneEtape_locatChoixChambre':
                    setLignesFactures_locat();
                    break;
                case'div_uneEtape_billetChoixPresta':
                    setLignesFactures_billet();
                    break;
            }
        }
    })(jQuery);
}
function verifErreurAjaxEtape1() {
    var verif = true;
    (function ($) {
        if ($('.spanErreurAjax', '.div_uneEtape_prodGP').length > 0) {
            if ($("#p_msgErreurs").text().length > 0) {
                $("#p_msgErreurs").append("<br />");
            }
            var text = '- ' + $('.spanErreurAjax', '.div_uneEtape_prodGP').text();
            $("#p_msgErreurs").append(text);
            $("#div_msgErreurs").show();
            verif = false;
        }
    })(jQuery);
    return verif;
}
function actualiseRecapPrix(dateDeb, dateFin) {
    (function ($) {
        idSession = getIdSessionInHtml();
        var tabData = {type: "verifDates", dateDeb: dateDeb, dateFin: dateFin};
        $.ajax({
            type: 'POST', url: urlAJAX, data: tabData, success: function (result) {
                var tabRetour = XMLToArray(result);
                if (tabRetour.modeResa != undefined) {
                    manageChangementTypeResa(tabRetour);
                    return;
                } else {
                    if (tabRetour.code == 'OK') {
                        afficheEffaceRecapPrix(tabRetour);
                    }
                }
            }
        });
    })(jQuery);
}
function initSaisieOccupantsResaBureau() {
    (function ($) {
        if ($('#div_saisieOccupantsResaBureau').length == 0) {
            return;
        }
        initLangue();
        $.datepicker.setDefaults($.datepicker.regional[lang]);
        $('.btn_saisieOccupants').click(function () {
            $('#div_saisieOccupantsResaBureau').dialog('open');
        });
        $('.btn_ajoutOccupant').click(function () {
            var ligneDefaut = $('#div_saisieOccupantsResaBureau_content').find('tr.ligneDefaut').clone();
            ligneDefaut.removeClass('ligneDefaut');
            $('#div_saisieOccupantsResaBureau_content tbody').append(ligneDefaut);
        });
        $('#div_saisieOccupantsResaBureau_content .inpt_naissanceOccupant').datepicker({
            changeMonth: true,
            changeYear: true,
            yearRange: '-100:+00'
        });
        var titrePopin = $('#inpt_titrePopinSaisieOccupants').val();
        $('#div_saisieOccupantsResaBureau').dialog({
            autoOpen: false, modal: true, title: titrePopin, buttons: {
                "Ok": function () {
                    var tabOccupants = new Array();
                    var i = 0;
                    $('#div_saisieOccupantsResaBureau_content tr').not('.ligneDefaut , .tr_ligneTitre').each(function () {
                        var nom = $(this).find('.inpt_nomOccupant').val();
                        if (nom == '') {
                            return;
                        }
                        var civilite = $(this).find('.select_civiliteOccupant').val();
                        var prenom = $(this).find('.inpt_prenomOccupant').val();
                        var naissance = $(this).find('.inpt_naissanceOccupant').val();
                        var pays = $(this).find('.select_paysOccupant').val();
                        tabOccupants[i] = new Array(civilite, nom, prenom, naissance, pays);
                        i++;
                    });
                    $.ajax({
                        type: 'POST',
                        url: urlAJAX,
                        data: {type: 'enregistreOccupants', tabOccupants: tabOccupants},
                        success: function (result) {
                            eval('var tabResult=' + result);
                            if (tabResult.code == 'OK') {
                                $('#div_saisieOccupantsResaBureau').dialog('close');
                            } else {
                            }
                        }
                    });
                }, "Annuler": function () {
                    $(this).dialog("close");
                }
            }, minWidth: 1150
        });
    })(jQuery);
}
window.enterNewsletter = 0;
var inscriptionOK = false;
function initInscriptionNewsletter() {
    (function ($) {
        if ($(".formIteaNewsletter").length > 0) {
            $(".itea_inscriptionNewsletterInput").bind("keypress", function (event) {
                var keycode = (event.keyCode ? event.keyCode : event.which);
                if (keycode == '13') {
                    if (window.enterNewsletter == 0) {
                        widget_valideNewsletter($(this).parent());
                        window.enterNewsletter++;
                    }
                }
            });
            $(".itea_inscriptionNewsletterButton").click(function () {
                widget_valideNewsletter($(this).parent());
            });
            $(".itea_inscriptionNewsletterContactLabInput").bind("keypress", function (event) {
                var keycode = (event.keyCode ? event.keyCode : event.which);
                if (keycode == '13') {
                    widget_openNewsletterContactLab($(this).parent());
                }
            });
            $(".itea_inscriptionNewsletterContactLabButton").click(function () {
                widget_openNewsletterContactLab($(this).parent());
            });
            $("#div_inscriptionNewletter_infoscomp #btnValid").click(function () {
                if (inscriptionOK) {
                    close_formContactLab();
                }
                else {
                    widget_valideNewsletterContactLab($(this).parents("form"));
                }
            });
            if ($("#inpt_ouverturePopinContactLab").length > 0) {
                widget_affichePopinContactLab();
            }
        }
    })(jQuery)
}
function widget_valideNewsletter(form) {
    (function ($) {
        $.ajax({
            url: 'lib_2/ajax/gereNewsletter.php',
            type: 'POST',
            dataType: 'JSON',
            data: form.serialize(),
            success: function (result) {
                form.next(".itea_inscriptionNewsletter_msgInfo").html(result.msg);
                form.next(".itea_inscriptionNewsletter_msgInfo").show();
                if (result.code == "OK") {
                    form.next(".itea_inscriptionNewsletter_msgInfo.echec").removeClass('echec');
                    form.next(".itea_inscriptionNewsletter_msgInfo").addClass('reussite');
                    form.hide();
                    if (window.widget_valideNewsletterQdFini)widget_valideNewsletterQdFini();
                    if (typeof(dataLayer) != 'undefined') {
                        dataLayer.push({'event': 'Newsletter'});
                    }
                }
                else {
                    form.next(".itea_inscriptionNewsletter_msgInfo.reussite").removeClass('reussite');
                    form.next(".itea_inscriptionNewsletter_msgInfo").addClass('echec');
                    window.enterNewsletter = 0;
                }
            }
        });
    })(jQuery)
}
function widget_openNewsletterContactLab(form) {
    (function ($) {
        $.ajax({
            url: 'lib_2/ajax/gereNewsletter.php',
            type: 'POST',
            dataType: 'JSON',
            data: form.serialize(),
            success: function (result) {
                form.next(".itea_inscriptionNewsletter_msgInfo").html(result.msg);
                form.next(".itea_inscriptionNewsletter_msgInfo").show();
                if (result.code == "OK") {
                    widget_affichePopinContactLab();
                }
                else {
                    form.next(".itea_inscriptionNewsletter_msgInfo.reussite").removeClass('reussite');
                    form.next(".itea_inscriptionNewsletter_msgInfo").addClass('echec');
                    window.enterNewsletter = 0;
                }
            }
        });
    })(jQuery)
}
function widget_affichePopinContactLab() {
    (function ($) {
        var divHref = "#div_inscriptionNewletter_infoscomp";
        jQuery.fancybox($(divHref), {
            maxWidth: 650,
            autoHeight: true,
            autoWidth: true,
            autoResize: true,
            autoSize: true,
            closeClick: false,
            openEffect: 'none',
            closeEffect: 'none',
            padding: 0
        });
        $('#inpt_email').val($('.formIteaNewsletter .itea_inscriptionNewsletterContactLabInput').val());
        $(".fancybox-wrap").attr("id", "div_fancyBoxFormNewsletter");
    })(jQuery)
}
function widget_valideNewsletterContactLab(form) {
    (function ($) {
        $(".itea_inscriptionNewsletterContactLab_msgInfo.reussite").removeClass('echec');
        $(".itea_inscriptionNewsletterContactLab_msgInfo").addClass('reussite');
        $(".itea_inscriptionNewsletterContactLab_msgInfo").html('Traitement en cours');
        $("#div_inscriptionNewletter_infoscomp #btnValid").slideUp();
        $.ajax({
            url: 'lib_2/ajax/gereNewsletter.php',
            type: 'POST',
            dataType: 'JSON',
            data: form.serialize(),
            success: function (result) {
                $(".itea_inscriptionNewsletterContactLab_msgInfo").html(result.msg);
                if (result.code == "OK") {
                    $(".itea_inscriptionNewsletterContactLab_msgInfo.reussite").removeClass('echec');
                    $(".itea_inscriptionNewsletterContactLab_msgInfo").addClass('reussite');
                    $(".itea_inscriptionNewsletterContactLab_msgInfo").html('Inscription enregistrée');
                    $("#div_inscriptionNewletter_infoscomp #btnValid").attr("value", "FERMER");
                    $("#div_inscriptionNewletter_infoscomp #btnValid").slideDown();
                    inscriptionOK = true;
                }
                else {
                    $(".itea_inscriptionNewsletterContactLab_msgInfo").html(result.msg);
                    $(".itea_inscriptionNewsletterContactLab_msgInfo.reussite").removeClass('reussite');
                    $(".itea_inscriptionNewsletterContactLab_msgInfo").addClass('echec');
                    $("#div_inscriptionNewletter_infoscomp #btnValid").slideDown();
                }
            }
        });
    })(jQuery)
}
function close_formContactLab() {
    jQuery.fancybox.close();
}
var LiveValidation = function (element, optionsObj) {
    this.initialize(element, optionsObj);
}
LiveValidation.VERSION = '1.4 standalone';
LiveValidation.TEXTAREA = 1;
LiveValidation.TEXT = 2;
LiveValidation.PASSWORD = 3;
LiveValidation.CHECKBOX = 4;
LiveValidation.SELECT = 5;
LiveValidation.FILE = 6;
LiveValidation.massValidate = function (validations) {
    var returnValue = true;
    for (var i = 0, len = validations.length; i < len; ++i) {
        var valid = validations[i].validate();
        if (returnValue)returnValue = valid;
    }
    return returnValue;
}
LiveValidation.prototype = {
    validClass: 'LV_valid',
    invalidClass: 'LV_invalid',
    messageClass: 'LV_validation_message',
    validFieldClass: 'LV_valid_field',
    invalidFieldClass: 'LV_invalid_field',
    initialize: function (element, optionsObj) {
        var self = this;
        if (!element)throw new Error("LiveValidation::initialize - No element reference or element id has been provided!");
        this.element = element.nodeName ? element : document.getElementById(element);
        if (!this.element)throw new Error("LiveValidation::initialize - No element with reference or id of '" + element + "' exists!");
        this.validations = [];
        this.elementType = this.getElementType();
        this.form = this.element.form;
        var options = optionsObj || {};
        this.validMessage = options.validMessage || 'Thankyou!';
        var node = options.insertAfterWhatNode || this.element;
        this.insertAfterWhatNode = node.nodeType ? node : document.getElementById(node);
        this.onlyOnBlur = options.onlyOnBlur || false;
        this.wait = options.wait || 0;
        this.onlyOnSubmit = options.onlyOnSubmit || false;
        this.beforeValidation = options.beforeValidation || function () {
        };
        this.beforeValid = options.beforeValid || function () {
        };
        this.onValid = options.onValid || function () {
            this.insertMessage(this.createMessageSpan());
            this.addFieldClass();
        };
        this.afterValid = options.afterValid || function () {
        };
        this.beforeInvalid = options.beforeInvalid || function () {
        };
        this.onInvalid = options.onInvalid || function () {
            this.insertMessage(this.createMessageSpan());
            this.addFieldClass();
        };
        this.afterInvalid = options.afterInvalid || function () {
        };
        this.afterValidation = options.afterValidation || function () {
        };
        if (this.form) {
            this.formObj = LiveValidationForm.getInstance(this.form);
            this.formObj.addField(this);
        }
        this.oldOnFocus = this.element.onfocus || function () {
        };
        this.oldOnBlur = this.element.onblur || function () {
        };
        this.oldOnClick = this.element.onclick || function () {
        };
        this.oldOnChange = this.element.onchange || function () {
        };
        this.oldOnKeyup = this.element.onkeyup || function () {
        };
        this.element.onfocus = function (e) {
            self.doOnFocus(e);
            return self.oldOnFocus.call(this, e);
        }
        if (!this.onlyOnSubmit) {
            switch (this.elementType) {
                case LiveValidation.CHECKBOX:
                    this.element.onclick = function (e) {
                        self.validate();
                        return self.oldOnClick.call(this, e);
                    }
                case LiveValidation.SELECT:
                case LiveValidation.FILE:
                    this.element.onchange = function (e) {
                        self.validate();
                        return self.oldOnChange.call(this, e);
                    }
                    break;
                default:
                    if (!this.onlyOnBlur)this.element.onkeyup = function (e) {
                        self.deferValidation();
                        return self.oldOnKeyup.call(this, e);
                    }
                    this.element.onblur = function (e) {
                        self.doOnBlur(e);
                        return self.oldOnBlur.call(this, e);
                    }
            }
        }
    },
    destroy: function () {
        if (this.formObj) {
            this.formObj.removeField(this);
            this.formObj.destroy();
        }
        this.element.onfocus = this.oldOnFocus;
        if (!this.onlyOnSubmit) {
            switch (this.elementType) {
                case LiveValidation.CHECKBOX:
                    this.element.onclick = this.oldOnClick;
                case LiveValidation.SELECT:
                case LiveValidation.FILE:
                    this.element.onchange = this.oldOnChange;
                    break;
                default:
                    if (!this.onlyOnBlur)this.element.onkeyup = this.oldOnKeyup;
                    this.element.onblur = this.oldOnBlur;
            }
        }
        this.validations = [];
        this.removeMessageAndFieldClass();
    },
    add: function (validationFunction, validationParamsObj) {
        this.validations.push({type: validationFunction, params: validationParamsObj || {}});
        return this;
    },
    remove: function (validationFunction, validationParamsObj) {
        var victimless = [];
        for (var i = 0, len = this.validations.length; i < len; i++) {
            var v = this.validations[i];
            if (v.type != validationFunction && v.params != validationParamsObj)victimless.push(v);
        }
        this.validations = victimless;
        return this;
    },
    deferValidation: function (e) {
        if (this.wait >= 300)this.removeMessageAndFieldClass();
        var self = this;
        if (this.timeout)clearTimeout(self.timeout);
        this.timeout = setTimeout(function () {
            self.validate()
        }, self.wait);
    },
    doOnBlur: function (e) {
        this.focused = false;
        this.validate(e);
    },
    doOnFocus: function (e) {
        this.focused = true;
        this.removeMessageAndFieldClass();
    },
    getElementType: function () {
        var nn = this.element.nodeName.toUpperCase();
        var nt = this.element.type.toUpperCase();
        switch (true) {
            case(nn == 'TEXTAREA'):
                return LiveValidation.TEXTAREA;
            case(nn == 'INPUT' && nt == 'TEXT'):
                return LiveValidation.TEXT;
            case(nn == 'INPUT' && (nt == 'EMAIL' || nt == 'TEL' || nt == 'NUMBER' || nt == 'RANGE')):
                return LiveValidation.TEXT;
            case(nn == 'INPUT' && nt == 'PASSWORD'):
                return LiveValidation.PASSWORD;
            case(nn == 'INPUT' && nt == 'CHECKBOX'):
                return LiveValidation.CHECKBOX;
            case(nn == 'INPUT' && nt == 'FILE'):
                return LiveValidation.FILE;
            case(nn == 'SELECT'):
                return LiveValidation.SELECT;
            case(nn == 'INPUT'):
                throw new Error('LiveValidation::getElementType - Cannot use LiveValidation on an ' + nt.toLowerCase() + ' input!');
            default:
                throw new Error('LiveValidation::getElementType - Element must be an input, select, or textarea - ' + nn.toLowerCase() + ' was given!');
        }
    },
    doValidations: function () {
        this.validationFailed = false;
        for (var i = 0, len = this.validations.length; i < len; ++i) {
            this.validationFailed = !this.validateElement(this.validations[i].type, this.validations[i].params);
            if (this.validationFailed)return false;
        }
        this.message = this.validMessage;
        return true;
    },
    validateElement: function (validationFunction, validationParamsObj) {
        switch (validationFunction) {
            case Validate.Presence:
            case Validate.Confirmation:
            case Validate.Acceptance:
                this.displayMessageWhenEmpty = true;
                break;
            case Validate.Custom:
                if (validationParamsObj.displayMessageWhenEmpty)this.displayMessageWhenEmpty = true;
                break;
        }
        var value = (this.elementType == LiveValidation.SELECT) ? this.element.options[this.element.selectedIndex].value : this.element.value;
        if (validationFunction == Validate.Acceptance) {
            if (this.elementType != LiveValidation.CHECKBOX)throw new Error('LiveValidation::validateElement - Element to validate acceptance must be a checkbox!');
            value = this.element.checked;
        }
        var isValid = true;
        try {
            validationFunction(value, validationParamsObj);
        } catch (error) {
            if (error instanceof Validate.Error) {
                if (value !== '' || (value === '' && this.displayMessageWhenEmpty)) {
                    this.validationFailed = true;
                    this.message = error.message.split('\n')[0];
                    isValid = false;
                }
            } else {
                throw error;
            }
        } finally {
            return isValid;
        }
    },
    validate: function () {
        if (!this.element.disabled) {
            this.beforeValidation();
            var isValid = this.doValidations();
            if (isValid) {
                this.beforeValid();
                this.onValid();
                this.afterValid();
                return true;
            } else {
                this.beforeInvalid();
                this.onInvalid();
                this.afterInvalid();
                return false;
            }
            this.afterValidation();
        } else {
            return true;
        }
    },
    enable: function () {
        this.element.disabled = false;
        return this;
    },
    disable: function () {
        this.element.disabled = true;
        this.removeMessageAndFieldClass();
        return this;
    },
    createMessageSpan: function () {
        var span = document.createElement('span');
        var textNode = document.createTextNode(this.message);
        span.appendChild(textNode);
        return span;
    },
    insertMessage: function (elementToInsert) {
        this.removeMessage();
        if (!this.validationFailed && !this.validMessage)return;
        if ((this.displayMessageWhenEmpty && (this.elementType == LiveValidation.CHECKBOX || this.element.value == '')) || this.element.value != '') {
            var className = this.validationFailed ? this.invalidClass : this.validClass;
            elementToInsert.className += ' ' + this.messageClass + ' ' + className;
            var parent = this.insertAfterWhatNode.parentNode;
            if (this.insertAfterWhatNode.nextSibling) {
                parent.insertBefore(elementToInsert, this.insertAfterWhatNode.nextSibling);
            } else {
                parent.appendChild(elementToInsert);
            }
        }
    },
    addFieldClass: function () {
        this.removeFieldClass();
        if (!this.validationFailed) {
            if (this.displayMessageWhenEmpty || this.element.value != '') {
                if (this.element.className.indexOf(this.validFieldClass) == -1)this.element.className += ' ' + this.validFieldClass;
            }
        } else {
            if (this.element.className.indexOf(this.invalidFieldClass) == -1)this.element.className += ' ' + this.invalidFieldClass;
        }
    },
    removeMessage: function () {
        var nextEl;
        var el = this.insertAfterWhatNode;
        while (el.nextSibling) {
            if (el.nextSibling.nodeType === 1) {
                nextEl = el.nextSibling;
                break;
            }
            el = el.nextSibling;
        }
        if (nextEl && nextEl.className.indexOf(this.messageClass) != -1)this.insertAfterWhatNode.parentNode.removeChild(nextEl);
    },
    removeFieldClass: function () {
        var cn = this.element.className;
        if (cn.indexOf(this.invalidFieldClass) != -1)this.element.className = cn.split(this.invalidFieldClass).join('');
        if (cn.indexOf(this.validFieldClass) != -1)this.element.className = cn.split(this.validFieldClass).join(' ');
    },
    removeMessageAndFieldClass: function () {
        this.removeMessage();
        this.removeFieldClass();
    }
}
var LiveValidationForm = function (element) {
    this.initialize(element);
}
LiveValidationForm.instances = {};
LiveValidationForm.getInstance = function (element) {
    if (!element)throw new Error("LiveValidationForm::getInstance - No element reference or element id has been provided!");
    var el = element.nodeName ? element : document.getElementById(element);
    var rand = Math.random() * Math.random();
    if (!el.id)el.id = 'formId_' + rand.toString().replace(/\./, '') + new Date().valueOf();
    if (!LiveValidationForm.instances[el.id])LiveValidationForm.instances[el.id] = new LiveValidationForm(el);
    return LiveValidationForm.instances[el.id];
}
LiveValidationForm.prototype = {
    beforeValidation: function () {
    }, onValid: function () {
    }, onInvalid: function () {
    }, afterValidation: function () {
    }, initialize: function (element) {
        this.name = element.id;
        this.element = element;
        this.fields = [];
        this.oldOnSubmit = this.element.onsubmit || function () {
        };
        var self = this;
        this.element.onsubmit = function (e) {
            var ret = false;
            self.beforeValidation(), self.valid = LiveValidation.massValidate(self.fields);
            self.valid ? self.onValid() : self.onInvalid();
            self.afterValidation();
            if (self.valid)ret = self.oldOnSubmit.call(this, e || window.event) !== false;
            if (!ret)return ret;
        }
    }, addField: function (newField) {
        this.fields.push(newField);
    }, removeField: function (victim) {
        var victimless = [];
        for (var i = 0, len = this.fields.length; i < len; i++) {
            if (this.fields[i] !== victim)victimless.push(this.fields[i]);
        }
        this.fields = victimless;
    }, destroy: function (force) {
        if (this.fields.length != 0 && !force)return false;
        this.element.onsubmit = this.oldOnSubmit;
        LiveValidationForm.instances[this.name] = null;
        return true;
    }
}
var Validate = {
    Presence: function (value, paramsObj) {
        var paramsObj = paramsObj || {};
        var message = paramsObj.failureMessage || "Can't be empty!";
        if (value === '' || value === null || value === undefined)Validate.fail(message);
        return true;
    }, Numericality: function (value, paramsObj) {
        var suppliedValue = value;
        var value = Number(value);
        var paramsObj = paramsObj || {};
        var minimum = ((paramsObj.minimum) || (paramsObj.minimum == 0)) ? paramsObj.minimum : null;
        ;
        var maximum = ((paramsObj.maximum) || (paramsObj.maximum == 0)) ? paramsObj.maximum : null;
        var is = ((paramsObj.is) || (paramsObj.is == 0)) ? paramsObj.is : null;
        var notANumberMessage = paramsObj.notANumberMessage || "Must be a number!";
        var notAnIntegerMessage = paramsObj.notAnIntegerMessage || "Must be an integer!";
        var wrongNumberMessage = paramsObj.wrongNumberMessage || "Must be " + is + "!";
        var tooLowMessage = paramsObj.tooLowMessage || "Must not be less than " + minimum + "!";
        var tooHighMessage = paramsObj.tooHighMessage || "Must not be more than " + maximum + "!";
        if (!isFinite(value))Validate.fail(notANumberMessage);
        if (paramsObj.onlyInteger && (/\.0+$|\.$/.test(String(suppliedValue)) || value != parseInt(value)))Validate.fail(notAnIntegerMessage);
        switch (true) {
            case(is !== null):
                if (value != Number(is))Validate.fail(wrongNumberMessage);
                break;
            case(minimum !== null && maximum !== null):
                Validate.Numericality(value, {tooLowMessage: tooLowMessage, minimum: minimum});
                Validate.Numericality(value, {tooHighMessage: tooHighMessage, maximum: maximum});
                break;
            case(minimum !== null):
                if (value < Number(minimum))Validate.fail(tooLowMessage);
                break;
            case(maximum !== null):
                if (value > Number(maximum))Validate.fail(tooHighMessage);
                break;
        }
        return true;
    }, Format: function (value, paramsObj) {
        var value = String(value);
        var paramsObj = paramsObj || {};
        var message = paramsObj.failureMessage || "Not valid!";
        var pattern = paramsObj.pattern || /./;
        var negate = paramsObj.negate || false;
        if (!negate && !pattern.test(value))Validate.fail(message);
        if (negate && pattern.test(value))Validate.fail(message);
        return true;
    }, Email: function (value, paramsObj) {
        var paramsObj = paramsObj || {};
        var message = paramsObj.failureMessage || "Must be a valid email address!";
        Validate.Format(value, {failureMessage: message, pattern: /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i});
        return true;
    }, Length: function (value, paramsObj) {
        var value = String(value);
        var paramsObj = paramsObj || {};
        var minimum = ((paramsObj.minimum) || (paramsObj.minimum == 0)) ? paramsObj.minimum : null;
        var maximum = ((paramsObj.maximum) || (paramsObj.maximum == 0)) ? paramsObj.maximum : null;
        var is = ((paramsObj.is) || (paramsObj.is == 0)) ? paramsObj.is : null;
        var wrongLengthMessage = paramsObj.wrongLengthMessage || "Must be " + is + " characters long!";
        var tooShortMessage = paramsObj.tooShortMessage || "Must not be less than " + minimum + " characters long!";
        var tooLongMessage = paramsObj.tooLongMessage || "Must not be more than " + maximum + " characters long!";
        switch (true) {
            case(is !== null):
                if (value.length != Number(is))Validate.fail(wrongLengthMessage);
                break;
            case(minimum !== null && maximum !== null):
                Validate.Length(value, {tooShortMessage: tooShortMessage, minimum: minimum});
                Validate.Length(value, {tooLongMessage: tooLongMessage, maximum: maximum});
                break;
            case(minimum !== null):
                if (value.length < Number(minimum))Validate.fail(tooShortMessage);
                break;
            case(maximum !== null):
                if (value.length > Number(maximum))Validate.fail(tooLongMessage);
                break;
            default:
                throw new Error("Validate::Length - Length(s) to validate against must be provided!");
        }
        return true;
    }, Inclusion: function (value, paramsObj) {
        var paramsObj = paramsObj || {};
        var message = paramsObj.failureMessage || "Must be included in the list!";
        var caseSensitive = (paramsObj.caseSensitive === false) ? false : true;
        if (paramsObj.allowNull && value == null)return true;
        if (!paramsObj.allowNull && value == null)Validate.fail(message);
        var within = paramsObj.within || [];
        if (!caseSensitive) {
            var lowerWithin = [];
            for (var j = 0, length = within.length; j < length; ++j) {
                var item = within[j];
                if (typeof item == 'string')item = item.toLowerCase();
                lowerWithin.push(item);
            }
            within = lowerWithin;
            if (typeof value == 'string')value = value.toLowerCase();
        }
        var found = false;
        for (var i = 0, length = within.length; i < length; ++i) {
            if (within[i] == value)found = true;
            if (paramsObj.partialMatch) {
                if (value.indexOf(within[i]) != -1)found = true;
            }
        }
        if ((!paramsObj.negate && !found) || (paramsObj.negate && found))Validate.fail(message);
        return true;
    }, Exclusion: function (value, paramsObj) {
        var paramsObj = paramsObj || {};
        paramsObj.failureMessage = paramsObj.failureMessage || "Must not be included in the list!";
        paramsObj.negate = true;
        Validate.Inclusion(value, paramsObj);
        return true;
    }, Confirmation: function (value, paramsObj) {
        if (!paramsObj.match)throw new Error("Validate::Confirmation - Error validating confirmation: Id of element to match must be provided!");
        var paramsObj = paramsObj || {};
        var message = paramsObj.failureMessage || "Does not match!";
        var match = paramsObj.match.nodeName ? paramsObj.match : document.getElementById(paramsObj.match);
        if (!match)throw new Error("Validate::Confirmation - There is no reference with name of, or element with id of '" + paramsObj.match + "'!");
        if (value != match.value)Validate.fail(message);
        return true;
    }, Acceptance: function (value, paramsObj) {
        var paramsObj = paramsObj || {};
        var message = paramsObj.failureMessage || "Must be accepted!";
        if (!value)Validate.fail(message);
        return true;
    }, Custom: function (value, paramsObj) {
        var paramsObj = paramsObj || {};
        var against = paramsObj.against || function () {
                return true;
            };
        var args = paramsObj.args || {};
        var message = paramsObj.failureMessage || "Not valid!";
        if (!against(value, args))Validate.fail(message);
        return true;
    }, now: function (validationFunction, value, validationParamsObj) {
        if (!validationFunction)throw new Error("Validate::now - Validation function must be provided!");
        var isValid = true;
        try {
            validationFunction(value, validationParamsObj || {});
        } catch (error) {
            if (error instanceof Validate.Error) {
                isValid = false;
            } else {
                throw error;
            }
        } finally {
            return isValid
        }
    }, fail: function (errorMessage) {
        throw new Validate.Error(errorMessage);
    }, Error: function (errorMessage) {
        this.message = errorMessage;
        this.name = 'ValidationError';
    }
}
function init_packDivDatesTarifs() {
    initSelectionTypeTarifs_packDivDatesTarifs();
    initSelectionMois_packDivDatesTarifs();
    initNavigationMois_packDivDatesTarifs();
    initSelectionPeriode_packDivDatesTarifs();
    checkAfficheBoutonWeekEnd_packDivDatesTarifs();
    checkAfficheBoutonMidWeek_packDivDatesTarifs();
    initCalendrierDatesFiche_packDivDatesTarifs();
    init_detailChambreAfficheTarifs();
    init_detailChambreAfficheDispo();
    initEventClickBoutonReserver_packDivDatesTarifs();
    var lblDefautArrivee = jQuery('#inpt_resaDateDeb').attr('data-lblDefautArrivee');
    var lblDefautDepart = jQuery('#inpt_resaDateFin').attr('data-lblDefautDepart');
    if (jQuery('#inpt_resaDateDeb').val() != '' && jQuery('#inpt_resaDateDeb').val() != lblDefautArrivee && jQuery('#inpt_resaDateFin').val() != '' && jQuery('#inpt_resaDateFin').val() != lblDefautDepart) {
        lanceCalculPrixSejour();
    }
}
function initSelectionTypeTarifs_packDivDatesTarifs() {
    (function ($) {
        $('.tarifsAvecDispo_choixDuree li span').bind('click', function () {
            var liParent = $(this).parent('li');
            if (liParent.hasClass('indisponible')) {
                return;
            }
            var typeTarif = $(this).parent('li').attr('data-duree-tarif');
            if (typeTarif == 'autre') {
                ouvreDatePickerDateDeb_packDivDatesTarifs();
            } else {
                $('.tarifsAvecDispo_choixDuree li').removeClass('active');
                liParent.addClass('active');
                $('.tarifsAvecDispo_detailUnMois .tarifsAvecDispo_detailUnMois_tarifUneDuree').hide();
                $('.tarifsAvecDispo_detailUnMois .tarifsAvecDispo_detailUnMois_tarifUneDuree[data-duree-tarif="' + typeTarif + '"]').show();
            }
            return false;
        });
    })(jQuery);
}
function initNavigationMois_packDivDatesTarifs() {
    (function ($) {
        $('.tarifsAvecDispo_choixMoisNext a').bind('click', function () {
            if (!$('.tarifsAvecDispo_listeMois li:visible').first().is('.active')) {
                $('.tarifsAvecDispo_listeMois li:visible').first().hide();
                $('.tarifsAvecDispo_listeMois li:visible').last().next().show();
                $('.tarifsAvecDispo_choixMoisPrev').css('visibility', 'visible');
            }
            var liMoisActifNext = $('.tarifsAvecDispo_listeMois li.active').next();
            selectionneMois_packDivDatesTarifs(liMoisActifNext);
        });
        $('.tarifsAvecDispo_choixMoisPrev a').bind('click', function () {
            if (!$('.tarifsAvecDispo_listeMois li:visible').last().is('.active')) {
                $('.tarifsAvecDispo_listeMois li:visible').last().hide();
                $('.tarifsAvecDispo_listeMois li:visible').first().prev().show();
                $('.tarifsAvecDispo_choixMoisNext').css('visibility', 'visible');
            }
            var liMoisPrev = $('.tarifsAvecDispo_listeMois li.active').prev();
            selectionneMois_packDivDatesTarifs(liMoisPrev);
        });
    })(jQuery);
}
function initSelectionMois_packDivDatesTarifs() {
    (function ($) {
        $('.tarifsAvecDispo_listeMois li').bind('click', function () {
            selectionneMois_packDivDatesTarifs($(this));
        });
    })(jQuery);
}
function selectionneMois_packDivDatesTarifs(liMois) {
    (function ($) {
        if (liMois.hasClass('active') && liMois.is(':first-child, :last-child')) {
            return false;
        }
        $('.tarifsAvecDispo_listeMois li').removeClass('active');
        liMois.addClass('active');
        if (liMois.not(':visible')) {
            $('.tarifsAvecDispo_listeMois li').hide();
            liMois.show();
            if (liMois.prev().length > 0) {
                liMois.prev().show();
            }
            if (liMois.is(':first-child')) {
                $('.tarifsAvecDispo_choixMoisPrev').css('visibility', 'hidden');
            } else {
                $('.tarifsAvecDispo_choixMoisPrev').css('visibility', 'visible');
            }
            if (liMois.next().length > 0) {
                liMois.next().show();
            }
            if (liMois.is(':last-child')) {
                $('.tarifsAvecDispo_choixMoisNext').css('visibility', 'hidden');
            } else {
                $('.tarifsAvecDispo_choixMoisNext').css('visibility', 'visible');
            }
        }
        var moisAnnee = liMois.attr('data-moisAnnee');
        $('.tarifsAvecDispo_detailUnMois').hide();
        $('.tarifsAvecDispo_detailUnMois[data-moisAnnee="' + moisAnnee + '"]').show();
        checkAfficheBoutonWeekEnd_packDivDatesTarifs();
        checkAfficheBoutonMidWeek_packDivDatesTarifs();
    })(jQuery);
}
function initSelectionPeriode_packDivDatesTarifs() {
    (function ($) {
        $('.tarifsAvecDispo_detailUnMois_tarifUneDuree td.libre').bind('click', function () {
            $('.tarifsAvecDispo_detailUnMois_tarifUneDuree td').removeClass('select');
            $(this).addClass('select');
            var dateDeb = $(this).attr('data-deb');
            var duree = $(this).attr('data-nbj');
            var objDate = new OBJDate(dateDeb);
            objDate.ajoutJour(duree);
            var dateFin = objDate.toString();
            if (objDateDeb == undefined) {
                objDateDeb = new Date();
            }
            objDateDeb.setFullYear(dateDeb.substr(6, 4), dateDeb.substr(3, 2) - 1, dateDeb.substr(0, 2));
            objDateDeb.setHours(0);
            objDateDeb.setMinutes(0);
            objDateDeb.setSeconds(0);
            if (objDateFin == undefined) {
                objDateFin = new Date();
            }
            objDateFin.setFullYear(dateFin.substr(6, 4), dateFin.substr(3, 2) - 1, dateFin.substr(0, 2));
            $('#div_choixDates_packDivDatesTarifs .inpt_moteurDatesDateDeb').val(dateDeb);
            $('#div_choixDates_packDivDatesTarifs .inpt_moteurDatesDateFin').val(dateFin);
            lanceCalculPrixSejour();
        });
        $('.tarifsAvecDispo_detailUnMois_tarifUneDuree td.partiellementDispo').bind('click', function () {
            if (typeof(ouvreDatePicker_partiellementDispo_foncAvant) == 'function') {
                ouvreDatePicker_partiellementDispo_foncAvant();
            }
            var dateDeb = $(this).attr('data-deb');
            var duree = $(this).attr('data-nbj');
            var objDate = new OBJDate(dateDeb);
            objDate.ajoutJour(duree);
            var dateFin = objDate.toString();
            objDateDeb = new Date();
            objDateDeb.setFullYear(dateDeb.substr(6, 4), dateDeb.substr(3, 2) - 1, dateDeb.substr(0, 2));
            objDateDeb.setHours(0);
            objDateDeb.setMinutes(0);
            objDateDeb.setSeconds(0);
            objDateFin = new Date();
            objDateFin.setFullYear(dateFin.substr(6, 4), dateFin.substr(3, 2) - 1, dateFin.substr(0, 2));
            defaultDateDebut = dateDeb;
            ouvreDatePickerDateDeb_packDivDatesTarifs();
            return false;
        });
    })(jQuery);
}
function lanceCalculPrixSejour() {
    (function ($) {
        var dateDeb = $('#div_choixDates_packDivDatesTarifs .inpt_moteurDatesDateDeb').val();
        ;
        var dateFin = $('#div_choixDates_packDivDatesTarifs .inpt_moteurDatesDateFin').val();
        if (dateDeb && dateFin) {
            var tabData = {type: 'verifDates', dateDeb: dateDeb, dateFin: dateFin};
            modeCalculPrixSurFiche = true;
            ajaxVerifDates(tabData);
        }
    })(jQuery);
}
function checkAfficheBoutonWeekEnd_packDivDatesTarifs() {
    (function ($) {
        var btnWeekEnd = $('.tarifsAvecDispo_choixDuree').find('li[data-duree-tarif="week-end"]');
        var divMoisSelect = $('.tarifsAvecDispo_detailUnMois:visible');
        var tableDureeWeekEnd = divMoisSelect.find('table.tarifsAvecDispo_detailUnMois_tarifUneDuree[data-duree-tarif="week-end"]');
        if (tableDureeWeekEnd.find('td').not('.indisponible').length > 0) {
            btnWeekEnd.removeClass('indisponible').attr("title", "");
        } else {
            btnWeekEnd.addClass('indisponible').attr("title", btnWeekEnd.attr("data-titlepasTarif"));
            if (btnWeekEnd.is('.active')) {
                $('.tarifsAvecDispo_choixDuree li[data-duree-tarif="semaine"] span').trigger('click');
            }
        }
    })(jQuery);
}
function checkAfficheBoutonMidWeek_packDivDatesTarifs() {
    (function ($) {
        var btnMidWeek = $('.tarifsAvecDispo_choixDuree').find('li[data-duree-tarif="mid-week"]');
        var divMoisSelect = $('.tarifsAvecDispo_detailUnMois:visible');
        var tableDureeMidWeek = divMoisSelect.find('table.tarifsAvecDispo_detailUnMois_tarifUneDuree[data-duree-tarif="mid-week"]');
        if (tableDureeMidWeek.find('td').not('.indisponible').length > 0) {
            btnMidWeek.removeClass('indisponible').attr("title", "");
        } else {
            btnMidWeek.addClass('indisponible').attr("title", btnMidWeek.attr("data-titlepasTarif"));
            if (btnMidWeek.is('.active')) {
                $('.tarifsAvecDispo_choixDuree li[data-duree-tarif="semaine"] span').trigger('click');
            }
        }
    })(jQuery);
}
function initCalendrierDatesFiche_packDivDatesTarifs() {
    (function ($) {
        var tabParam = new Array();
        tabParam.ident = jQuery('#div_choixDates_packDivDatesTarifs').attr('data-ident');
        tabParam.instance = jQuery('#div_choixDates_packDivDatesTarifs').attr('data-instance');
        tabParam.exercice = jQuery('#div_choixDates_packDivDatesTarifs').attr('data-exercice');
        tabParam.modeFicheV8 = true;
        afficherMasquerCalendrier(tabParam);
    })(jQuery);
}
function majDivTarifAPartirDe(tabRetour) {
    (function ($) {
        if (tabRetour.msgErreurCalculPrix) {
            $('.tarifFicheApartirDe').hide();
            if ($('#div_msgErreurRetourVerifDates').length > 0) {
                $('#div_msgErreurRetourVerifDates').replaceWith(tabRetour.msgErreurCalculPrix);
            } else {
                $('.tarifFicheApartirDe').before(tabRetour.msgErreurCalculPrix);
            }
        } else if (tabRetour.htmlTarifFicheApartirDe) {
            $('#div_msgErreurRetourVerifDates').hide();
            $('.tarifFicheApartirDe').html(tabRetour.htmlTarifFicheApartirDe);
            $('.tarifFicheApartirDe').show();
        } else {
            $('.tarifFicheApartirDe').hide();
        }
        if (tabRetour.msgInfoDemandeParMail) {
            if ($('#div_msgInfoDemandeParMail').length > 0) {
                $('#div_msgInfoDemandeParMail').replaceWith(tabRetour.msgInfoDemandeParMail);
            } else {
                $('.tarifFicheApartirDe').after(tabRetour.msgInfoDemandeParMail);
            }
        } else {
            $('#div_msgInfoDemandeParMail').hide();
        }
        if (tabRetour.htmlBoutonReserver) {
            $('.div_btnResa').html(tabRetour.htmlBoutonReserver);
            majHrefBoutonReserver();
            initEventClickBoutonReserver_packDivDatesTarifs();
        }
        if (tabRetour.location) {
            var prixLocation = tabRetour.location.replace(' &euro;', '');
            $('#a_btnReserver_packDivDatesTarifs').attr('data-prix', prixLocation);
        }
        if (tabRetour.changeMsgBtnReserver) {
            var titleDemandeResa = $('#a_btnReserver_packDivDatesTarifs').attr('data-titleDemandeResa');
            $('#a_btnReserver_packDivDatesTarifs').attr('title', titleDemandeResa);
            $('#a_btnReserver_packDivDatesTarifs .sp_lblReserver').each(function () {
                var lblDemandeResa = $(this).attr('data-lblDemandeResa');
                $(this).text(lblDemandeResa);
            });
        }
    })(jQuery);
}
function majDivChambres_packDivDatesTarifs(tabRetour) {
    jQuery('#div_fiche_bloc_tarif_chmb_packDivDatesTarifs').replaceWith(tabRetour.htmlDivChambres);
    init_detailChambreAfficheTarifs();
    init_detailChambreAfficheDispo();
    if (window.majDivChambres_packDivDatesTarifs_foncQdFini) {
        majDivChambres_packDivDatesTarifs_foncQdFini();
    }
}
function majHrefBoutonReserver() {
    (function ($) {
        if ($('#a_btnReserver_packDivDatesTarifs').attr('data-accesResa') == 'O') {
            var lienResa = $('#a_btnReserver_packDivDatesTarifs').attr('data-lienResa');
            $('#a_btnReserver_packDivDatesTarifs').attr('href', lienResa);
            $('#a_btnReserver_packDivDatesTarifs').attr('target', '_blank');
            if (typeof(waDecorateLink) == "function") {
                lienResa = waDecorateLink(lienResa);
            }
            $('#a_btnReserver_packDivDatesTarifs').attr('href', lienResa);
        }
    })(jQuery);
}
function initEventClickBoutonReserver_packDivDatesTarifs() {
    (function ($) {
        $('#a_btnReserver_packDivDatesTarifs').unbind('click');
        $('#a_btnReserver_packDivDatesTarifs').bind('click', function () {
            var lblDefautArrivee = $('#inpt_resaDateDeb').attr('data-lblDefautArrivee');
            var lblDefautDepart = $('#inpt_resaDateFin').attr('data-lblDefautDepart');
            if ($('#inpt_resaDateDeb').length > 0 && $('#inpt_resaDateFin').length > 0) {
                if ($('#inpt_resaDateDeb').val() == '' || $('#inpt_resaDateDeb').val() == lblDefautArrivee || $('#inpt_resaDateFin').val() == '' || $('#inpt_resaDateFin').val() == lblDefautDepart) {
                    ouvreDatePickerDateDeb_packDivDatesTarifs();
                    return false;
                }
            }
            if (window.dataLayer) {
                var tabParamsGTM = $(this).attr('data-paramsTrackEvent');
                var listeParams = eval('(' + tabParamsGTM + ')');
                dataLayer.push({
                    'Label_Event': listeParams.label,
                    'Categorie_Event': listeParams.categorie,
                    'event': listeParams.action
                });
                var prix = $(this).attr('data-prix');
                var TransactionId = listeParams.prefixe + listeParams.label;
                dataLayer.push({
                    'Transaction_Id': TransactionId,
                    'Product_Id': listeParams.ident,
                    'Price': prix,
                    'event': 'Criteo_Contact'
                });
            }
        });
    })(jQuery);
}
function ouvreDatePickerDateDeb_packDivDatesTarifs() {
    if (jQuery('#div_choixDates').length > 0) {
        jQuery('#div_choixDates #inpt_resaDateDeb').trigger('click');
    } else {
        jQuery('#div_choixDates_packDivDatesTarifs #inpt_resaDateDeb').trigger('click');
    }
}
function majTarifsSelectionne(dateDeb, dateFin) {
    (function ($) {
        var objDateDeb = new OBJDate(dateDeb);
        var objDateFin = new OBJDate(dateFin);
        var moisAnnee = objDateDeb.getMois() + '-' + objDateDeb.getAnnee();
        var nbj = objDateDeb.getNbJourEcartWithOBJDate(objDateFin);
        var liMoisASelect = $('.tarifsAvecDispo_listeMois li[data-moisannee="' + moisAnnee + '"]');
        var divMoisSelect = $('.tarifsAvecDispo_detailUnMois[data-moisannee="' + moisAnnee + '"]');
        selectionneMois_packDivDatesTarifs(liMoisASelect);
        $('.tarifsAvecDispo_detailUnMois_tarifUneDuree td').removeClass('select');
        if (objDateDeb.getJourSemaine() == 6 && nbj == 7) {
            $('.tarifsAvecDispo_choixDuree li[data-duree-tarif="semaine"] span').trigger('click');
            divMoisSelect.find('.tarifsAvecDispo_detailUnMois_tarifUneDuree[data-duree-tarif="semaine"] td[data-deb="' + dateDeb + '"]').addClass('select');
        } else if (objDateDeb.getJourSemaine() == 5 && nbj == 2) {
            $('.tarifsAvecDispo_choixDuree li[data-duree-tarif="week-end"] span').trigger('click');
            divMoisSelect.find('.tarifsAvecDispo_detailUnMois_tarifUneDuree[data-duree-tarif="week-end"] td[data-deb="' + dateDeb + '"]').addClass('select');
        } else if (objDateDeb.getJourSemaine() == 1 && nbj == 7) {
            $('.tarifsAvecDispo_choixDuree li[data-duree-tarif="mid-week"] span').trigger('click');
            divMoisSelect.find('.tarifsAvecDispo_detailUnMois_tarifUneDuree[data-duree-tarif="mid-week"] td[data-deb="' + dateDeb + '"]').addClass('select');
        }
    })(jQuery);
}
function init_detailChambreAfficheTarifs() {
    (function ($) {
        $(".a_btVoirPrixChambre").click(function () {
            var numChambre = $(this).attr("data-chambre");
            if ($(this).hasClass("closed")) {
                $('.div_tarifUneChambre_tarifs[data-chambre="' + numChambre + '"]').show();
                $(this).removeClass("closed").addClass("opened");
            }
            else {
                $('.div_tarifUneChambre_tarifs[data-chambre="' + numChambre + '"]').hide();
                $(this).addClass("closed").removeClass("opened");
            }
        });
    })(jQuery);
}
function init_detailChambreAfficheDispo() {
    (function ($) {
        $(".a_btVoirDispoChambre").click(function () {
            var avecPlanning = true;
            if ($(this).attr("data-planning") == "false") {
                avecPlanning = false;
            }
            if (avecPlanning) {
                ouvreDatePickerDateDeb_packDivDatesTarifs();
            }
            else {
                alert("Pour connaitre les disponibilités veuillez contacter le propriétaire.");
            }
            return false;
        });
    })(jQuery);
}
function reinitDatepickers_packDivTarifs() {
    (function ($) {
        var lblDefautArrivee = $('#inpt_resaDateDeb').attr('data-lblDefautArrivee');
        var lblDefautDepart = $('#inpt_resaDateFin').attr('data-lblDefautDepart');
        $('#inpt_resaDateDeb').val(lblDefautArrivee);
        $('#inpt_resaDateFin').val(lblDefautDepart);
    })(jQuery);
}