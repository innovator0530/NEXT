import React from "react"
import Body from "../components/website/body/body"

const Imprint = () => {
	return (
		<Body
			topPadding
			style={{ color: "white", backgroundColor: "#141414", lineHeight: "22px" }}
			innerContainer
		>
			<h1 style={{ alignSelf: "center", marginBottom: "100px" }}>Imprint</h1>
			<p style={{ opacity: 0.5 }}>Kontaktadresse</p>
			J.S. Suisse GmbH
			<br />
			Tobelrainli 10
			<br />
			5416 Kirchdorf
			<br />
			Schweiz
			<br />
			contact@rewave.ch
			<br />
			<br />
			<p style={{ opacity: 0.5 }}>Vertretungsberechtigte Personen</p>
			Frangiskos Schweizer und Agam Jamwal
			<br />
			<br />
			<p style={{ opacity: 0.5 }}>Handelsregistereintrag</p>
			Eingetragener Firmenname: J.S. Suisse GmbH
			<br />
			Nummer: CHE-368.437.297
			<br />
			<br />
			<p style={{ opacity: 0.5 }}>Mehrwertsteuernummer</p>
			CHE-368.437.297-MWST
			<br />
			<br />
			<p style={{ opacity: 0.5 }}>Haftungsausschluss</p>
			Der Autor übernimmt keinerlei Gewähr hinsichtlich der inhaltlichen
			Richtigkeit, Genauigkeit, Aktualität, Zuverlässigkeit und Vollständigkeit
			der Informationen. Haftungsansprüche gegen den Autor wegen Schäden
			materieller oder immaterieller Art, welche aus dem Zugriff oder der
			Nutzung bzw. Nichtnutzung der veröffentlichten Informationen, durch
			Missbrauch der Verbindung oder durch technische Störungen entstanden sind,
			werden ausgeschlossen. Alle Angebote sind unverbindlich. Der Autor behält
			es sich ausdrücklich vor, Teile der Seiten oder das gesamte Angebot ohne
			gesonderte Ankündigung zu verändern, zu ergänzen, zu löschen oder die
			Veröffentlichung zeitweise oder endgültig einzustellen.
			<br />
			<br />
			<p style={{ opacity: 0.5 }}>Haftung für Links</p>
			Verweise und Links auf Webseiten Dritter liegen ausserhalb unseres
			Verantwortungsbereichs Es wird jegliche Verantwortung für solche Webseiten
			abgelehnt. Der Zugriff und die Nutzung solcher Webseiten erfolgen auf
			eigene Gefahr des Nutzers oder der Nutzerin.
			<br />
			<br />
			<p style={{ opacity: 0.5 }}>Urheberrechte</p>
			Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder
			anderen Dateien auf der Website gehören ausschliesslich der Firma
			Schweizer REWAVE oder den speziell genannten Rechtsinhabern. Für die
			Reproduktion jeglicher Elemente ist die schriftliche Zustimmung der
			Urheberrechtsträger im Voraus einzuholen.
			<br />
		</Body>
	)
}

export default Imprint
