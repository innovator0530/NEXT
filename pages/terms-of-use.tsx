import Body from "../components/website/body/body"
import styled from "styled-components"

const TermsOfUseContainer = styled.div`
    ul, ol{
        padding-left: 3em;
    }
    h1,h2,h3,h4{
        font-family: "TT Commons W01 Bold";
        font-weight: 700;
    }
    h3,h4{
        margin-top: 40px;
        margin-bottom: 15px;
    }
    ol li{
        margin-top: 5px;
    }
`

export default function TermsOfUse() {
	return (
		<Body
			topPadding
			style={{ color: "white", backgroundColor: "#141414", lineHeight: "22px" }}
			innerContainer
		>
			<TermsOfUseContainer>
				<h2>Terms of Use</h2>
				<p>
					Please read these Terms of Use very carefully as they constitute a
					binding agreement between you (in these Terms, the End User or You),
					and us (in these Terms, REWAVE DISTRIBUTION, We or Us) and are
					effective upon the registration on the platform, available at&nbsp;
					<a href="https://dashboard.rewave.ch/">
						<u>https://dashboard.rewave.ch</u>
					</a>
					&nbsp;(hereinafter, the Platform).
				</p>
				<p>
					Formally, the provider of the service and responsible of the Platform
					is J.S. Suisse GmbH, which is a limited liability Company constituted
					and existing under the laws of Switzerland, with legal address in
					Tobelrainli 10 5416 Kirchdorf (Switzerland), Tax ID
					#CHE-368.437.297-MWST and registered at the Commercial Register of
					Aargau with Company Registration Number CHE-368.437.297. Our contact
					information can be found here: https://rewave.ch/imprint.
				</p>
				<p>
					The REWAVE DISTRIBUTION services shall be provided in accordance with:
				</p>
				<ul>
					<li>
						<p>The Terms of Use set forth in this document.</p>
					</li>
					<li>
						<p>
							The Privacy Policy made available to You in the Legal Section of
							your Account.
						</p>
					</li>
				</ul>
				<p>
					Please, provide and fill out all the information required in the
					"Settings" section of the Platform as it is necessary to create the
					contractual relationship between us. We made our Terms of Use as easy
					to read as possible, but if you have any doubt or query, please
					contact us by using any of the communication channels described above.
				</p>
				<p>
					<h4>Table of Contents:</h4>
				</p>
				<ol>
					<li>
						<p>
							<a >
								{/* href="#definitions" */}
								<u>Definitions</u>
							</a>
						</p>
					</li>
					<li>
						<p>
							<a >
							{/* href="#general" */}
								<u>General Conditions; Access to and use of the Services</u>
							</a>
						</p>
					</li>
					<li>
						<p>
							<a >
							{/* href="#what-you" */}
								<u>What You can do and what you can't do</u>
							</a>
						</p>
					</li>
					<li>
						<p>
							<a>
							{/* thref="#fees" */}
								<u>Fees</u>
							</a>
						</p>
					</li>
					<li>
						<p>
							<a> 
							{/* href="#duration" */}
								<u>Duration and Termination</u>
							</a>
						</p>
					</li>
					<li>
						<p>
							<a >
							{/* href="#intellectual" */}
								<u>Intellectual Property Rights</u>
							</a>
						</p>
					</li>
					<li>
						<p>
							<a >
							{/* href="#fraud" */}
								<u>Fraud</u>
							</a>
						</p>
					</li>
					<li>
						<p>
							<a >
							{/* href="#privacy" */}
								<u>Privacy</u>
							</a>
						</p>
					</li>
					<li>
						<p>
							<a >
							{/* href="#warranty" */}
								<u>Warranty. Limitation of Liability</u>
							</a>
						</p>
					</li>
					<li>
						<p>
							<a >
							{/* href="#miscellaneous" */}
								<u>Miscellaneous</u>
							</a>
						</p>
					</li>
				</ol>
				<p >
					<h4>Definitions</h4>
				</p>
				<p>
					To facilitate the understanding of these Terms of Use, the following
					principal expressions will have these meanings:
				</p>
				<p>
					&ldquo;<strong>Customer&rdquo;</strong>: refers to any individual that
					accesses or makes use of a Digital Music Service.
				</p>
				<p>
					&ldquo;<strong>Digital Distribution&rdquo;</strong>: means the
					transferring by any means of data transmission or communication,
					through the internet, internet radio, kiosks, in-store listening
					posts, mobile, wireless, satellite and similar communication systems,
					whether now known or existing in the future, of the End User Content
					in multiple digital formats including but not limited to clips,
					permanent downloads, subscriptions, streams and timeout-downloads,
					ring-tones and ring-back tones and any other means.
				</p>
				<p>
					&ldquo;<strong>Digital Music Service&rdquo;</strong>: means any
					digital outlet, such as music download portals, music and video
					streaming services, mobile music platforms, digital (and terrestrial)
					radio stations, digital (and terrestrial) television networks, and
					mobile networks (each a &ldquo;DMS&rdquo;, i.e.: Apple iTunes,
					Spotify, Tidal, Google Play, etc.), that enables Customers to purchase
					and/or listen to End User Content.
				</p>
				<p>
					&ldquo;<strong>End User&rdquo;</strong>: that&rsquo;s You
					(hereinafter, the End User), which is an artist, songwriter, author,
					producer, agent (including royalty recipients), rights holder or
					others who are authorized and entitled to exploit certain music
					(including the composition and the recording) and to use the Platform,
					the Platform API or portions thereof.
				</p>
				<p>
					&ldquo;<strong>End User Content&rdquo;</strong>: means all
					intellectual property works (including without limitation musical
					works, recordings, video clips, ring-tones, real-tones, lyrics, logos,
					covers and photos) as to which the End User has the necessary
					exploitation rights, including &ldquo;Neigboring Rights&rdquo;.
				</p>
				<p>
					&ldquo;<strong>Platform&rdquo;</strong>: refers to the digital music
					distribution platform available at&nbsp;
					<a href="https://dashboard.rewave.ch/">
						<u>https://dashboard.rewave.ch</u>
					</a>
					&nbsp;or your designated subdomain.
				</p>
				<p>
					&ldquo;<strong>Service&rdquo;</strong>: means the service provided by
					Us through the Platform, in order to make the End User Content
					available on Digital Music Services (here, the Digital Distribution
					Services).
				</p>
				<p>Hence, these are the rights and obligations of each of us:</p>
				<p>
					<h4>General Conditions; Access to and use of the Services</h4>
				</p>
				<p>
					2.1 During the Duration and subject to compliance by You with these
					Terms of Use, You have the right to access to the Platform and enjoy
					the Service provided by Us through it.
				</p>
				<p>
					2.2 For information purposes, the features of the Platform include but
					are not limited to:
				</p>
				<ul>
					<li>
						<p>
							Upload of the End User Content to the Platform for its
							availability on Digital Music Services.
						</p>
					</li>
					<li>
						<p>
							Selection of the channels, territories and Digital Music Services
							where End Users want their content to be available at.
						</p>
					</li>
					<li>
						<p>
							Optional services, including quality control, distribution,
							updates and storage.
						</p>
					</li>
					<li>
						<p>
							Pay directly the corresponding fees for the contracting services.
						</p>
					</li>
					<li>
						<p>Hosting of the End User Content.</p>
					</li>
					<li>
						<p>
							Qualification, transformation and transmission to Digital Music
							Services.
						</p>
					</li>
					<li>
						<p>Updating of distributed works in Digital Music Services.</p>
					</li>
					<li>
						<p>Takedown of content.</p>
					</li>
					<li>
						<p>Assigning codes (ISRC, UPC, ISWC).</p>
					</li>
					<li>
						<p>
							Accessing sales and usage reports of the End User Content in the
							Digital Music Services.
						</p>
					</li>
					<li>
						<p>
							Request out payment of the Royalties generated by the End User
							Content.
						</p>
					</li>
					<li>
						<p>Manage and receive neighboring rights.</p>
					</li>
				</ul>
				<p>
					Nonetheless, We reserve the right to include new functionalities or
					eliminate any of the features of the Service, to change the
					characteristics, design, appearance or presentation of the Platform
					and the Service, in which case, if You are unsatisfied with the
					resulting Platform, You can terminate the relationship in the terms
					described in these Terms of Use.
				</p>
				<p>
					2.3 Furthermore, You undertake that You have all necessary rights in
					respect with Your Content to exploit it through the Platform and,
					therefore, give us the administration of your Content as requested by
					You at each time, in the terms described in Section 6. This right and
					authorization is granted on an exclusive basis for those Digital Music
					Services on which You decide to make Your Content available through
					our Service; this means that if You use the Service to make Your
					Content available in an specific Digital Music Service, You
					can&rsquo;t make the same content available in the same Digital Music
					Service using a service different than the Service and the Platform.
				</p>
				<p>
					<   h4>What You can do and what you can't do</h4>
				</p>
				<p>
					<strong>Use of the Platform</strong>
				</p>
				<p>
					3.1 By registering and uploading Your Content on the Platform, You
					assume and undertake, essentially, the following obligations:
				</p>
				<ul>
					<li>
						<p>
							You shall use the Platform diligently and upload information and
							content whose rights belong to You or for which You are authorized
							by the rights holder.
						</p>
					</li>
					<li>
						<p>
							You shall provide all the necessary information to use the
							Service, which We will request during the use of the Service.
						</p>
					</li>
					<li>
						<p>
							You shall pay all the applicable fees for the Services rendered by
							Us, as described below.
						</p>
					</li>
					<li>
						<p>
							You shall inform Us of any activity that is inconsistent with this
							Terms of Use.
						</p>
					</li>
					<li>
						<p>
							You shall indicate through the Platform if Your Content contains
							"explicit&rdquo; content. The term "explicit" content refers to
							content that evokes sexual, racist, violent or any other harmful
							connotations.
						</p>
					</li>
					<li>
						<p>
							You shall not perform illegal activities through the Platform or
							the Services, and/or actions that could harm or damage any party,
							including Us.
						</p>
					</li>
				</ul>
				<p>
					3.2 You undertake to use diligently the Platform and, therefore,
					undertake:
				</p>
				<ol type="a">
					<li>
						<p>
							not to grant access to the Platform to any third party or to
							employees that due to their position in the company, reasonably
							should not access the Platform;
						</p>
					</li>
					<li>
						<p>not to access the source code of the Platform;</p>
					</li>
					<li>
						<p>
							not to use the information, rules or instructions contained in the
							Platform for purposes different than those established in these
							Terms of Use;
						</p>
					</li>
					<li>
						<p>
							not to disclose to any third party any of the information obtained
							through the Platform;
						</p>
					</li>
					<li>
						<p>
							not to permit the public to access or use the Platform (including
							without limitation, via the internet).
						</p>
					</li>
					<li>
						<p>
							not to use the Platform to upload content not owned by You or for
							which You do not have an explicit license to commercially exploit.
						</p>
					</li>
					<li>
						<p>
							not to reproduce the Platform, in whole or in part, for any
							purposes;
						</p>
					</li>
					<li>
						<p>
							not to copy and/or distribute the Platform, in whole or in part,
							by any manner;
						</p>
					</li>
					<li>
						<p>
							not to create any form of "frame" or "mirror" for (any part of)
							the Platform on any other server or wireless or Internet‑based
							device;
						</p>
					</li>
					<li>
						<p>not to transfer the Platform to any third party;</p>
					</li>
					<li>
						<p>
							not to assign, sell, resell, rent, lease, lend, sublicense,
							outsource or otherwise transfer the Platform and/or the Service to
							any third party, or authorize or appoint any third party to do so;
						</p>
					</li>
					<li>
						<p>
							not to modify the Platform or provide any person with the means to
							do the same. This includes the creation of derivative works and to
							translate, disassemble, recompile, alter, destroy or reverse
							engineer the Platform or attempt to do so, unless when expressly
							permitted by the applicable regulation;
						</p>
					</li>
					<li>
						<p>
							not to circumvent the technological protection measures
							incorporated in the Platform.
						</p>
					</li>
				</ol>
				<p>
					3.3 In general, You agree to use the Platform in a lawful and diligent
					manner and will not do anything forbidden by Law of by these Terms of
					Use. You will be liable to Us in respect of any breach of these Terms
					of Use, as described in Section 9.
				</p>
				<p>
					<strong>Upload and storage of Your Content</strong>
				</p>
				<p>
					3.4 After registration, You can upload Your Content (including sound
					recordings and audiovisual works, photographs, images, and other
					related content) to your personal account, for their subsequent
					Digital Distribution.
				</p>
				<p>
					3.5 You can only upload content to the Platform for which You are the
					owner or have the rightsholders&rsquo; permission in writing, and
					cannot upload any content whose rights are held by third parties. We
					may ask you to facilitate to Us all documents, contracts and
					registration certificates necessary to confirm that you own the rights
					of Your Content and reserve the right to ask you not to upload content
					from a specific author or producer, or We may also remove any of Your
					Content from the Platform for which We don&rsquo;t have the legal
					conviction that it belongs to You.
				</p>
				<p>
					3.6 As specified before, You can&rsquo;t, under any circumstance,
					upload any content that could be harmful, threatening, unlawful,
					confidential, defamatory, libelous, harassing, obscene, indecent,
					fraudulent, infringing the rights of privacy, incites hate or includes
					texts of racist, ethnic or other nature, that is against or hinders or
					limits in any way any individual, or which may expose Us or third
					parties to any harm or liability of any kind.
				</p>
				<p>
					3.7 You can&rsquo;t either upload any private or fake information of
					any third party, including, among others, mail addresses, phone
					numbers, and email addresses.
				</p>
				<p>
					3.8 You are not allowed to upload any content that may breach
					copyright law or third party brand ownership
				</p>
				<p>
					3.9 As We specified before, You are free to exploit Your Content,
					directly or through third parties, to Digital Music Services which are
					not selected or made available on the Platform.
				</p>
				<p>
					3.10 We reserve the right to access to and analyze all or part of Your
					Content in order to guarantee the compliance with the Law and with
					these Terms of Use. We also reserve the right to delete files, data or
					information uploaded by You if We deem that they are not in compliance
					with these Terms of Use, or if We think they are not suitable or
					appropriate for the Platform or the Service.
				</p>
				<p>
					3.11 Finally, for clarification purposes, these Terms of Use do not
					provide any obligation to You to upload a minimum quantity of content
					and/or a minimum availability of it.
				</p>
				<p>
					<h4>Fees</h4>
				</p>
				<p>
					4.1 By using the Service, You agree to the pricing plan found in the
					&ldquo;Upgrade your plan&rdquo; tab. Additionally, You will receive
					the specified percentage in the plan of the net incomes (deducting
					expenses and taxes) which We receive from Digital Music Services from
					the exploitation of Your Content. The payout threshold is $1, but we
					reserve the right to refuse the payout if the payout transaction fees
					higher than the amount.
				</p>
				<p>
					4.2 All payments and associated claims: (i) will be made through the
					corresponding "Royalty Statements" section of the Platform; (ii) will
					be made in the currency stated by Us; and (iii) will be payable via
					PayPal or bank-to-bank wire transfer to the account designated by You.
					If any authority imposes a duty, tax, levy, or fee, You agree to pay
					that amount or supply exemption documentation.
				</p>
				<p>
					Payment of generated sales fees under these Terms of Use shall be made
					on a once a month, within days from receipt of an out payment request
					from you, provided always that the due amount exceeds the
					corresponding minimum payment threshold for the relevant requested
					payout. Nonetheless, You authorize Us to withhold any payment during
					an additional period of twenty-four (24) months in the event we deem
					that such payment contains incomes or fees totally or partially
					generated fraudulently or contravening these Terms of Use or the
					Anti-Fraud Policy. Any payment You receive from Us will be subject to
					all and any applicable taxes (including VAT, withholding taxes, etc.).
				</p>
				<p>
					The payment of an invoice will not later prevent Us from disputing the
					invoiced amounts pursuant to any rights herein. We may recoup any
					amounts due to Us from You by withholding such amounts from any fees
					otherwise due in the future and providing notice thereof.
				</p>
				<p>
					4.3 If any Digital Music Service deducts any amount due to any passed
					contingency, overpayment or conclusion in relation to Your Content or
					an investigation by Us reasonably demonstrates that any of Your fees
					for any prior month should have been lesser, We may, at the conclusion
					of such investigation and at our sole discretion, provide a revised
					sales report for the applicable month(s) and deduct the corresponding
					amount from future payments, what You acknowledge and accept.
				</p>
				<p>
					4.4 Therefore, You expressly and irrevocably authorize Us to collect
					all incomes from the exploitation of Your Content through the
					Platform, including but not limited to author rights, performing and
					recording rights, any levy established by law for private copies, or
					for any other concept, without limitation. For this purpose, We may
					ask you to sign a specific authorization letter as solicited by the
					corresponding Performing Right Organization, which You undertake to
					provide as soon as requested by Us.
				</p>
				<p>
					4.5 We will make any corresponding invoices and receipts, including
					mandatory taxes, available to You according to the applicable
					regulations.
				</p>
				<p>
					4.6 We reserve the right to change in the future the Service price,
					the sales commission percentage or the minimum payment threshold, in
					which case the new terms will be notified to You not less than thirty
					(30) days prior to the effective date and will be applicable to future
					incomes.
				</p>
				<p>
					4.7 We may decide not to charge you initially for the use of the
					Service and any optional service, however, You authorize Us to deduct
					the corresponding amounts from your future payments.
				</p>
				<p>
					In the event that after one year from the start of the relationship,
					You have distributed Your Content on credit, without having generated
					enough sales to pay back the outstanding balance, We reserve the right
					to request the payment of the outstanding balance.
				</p>
				<p>
					4.8 Audits: We will maintain accurate and complete records of account
					including all documentation needed by You to compute and verify the
					fees payable to You in connection with the performance of our
					agreement. During the Duration of our relationship and the three-year
					period thereafter, upon reasonable advance written notice, but in no
					event less than 30 calendar days&rsquo; notice, an independent
					reputable certified accounting firm appointed by You, will have the
					right to examine those records at any time during our normal business
					hours at the place where such records are normally maintained. You
					will have the right to audit your records only once a year.
				</p>
				<p>
					<h4>Duration and Termination</h4>
				</p>
				<p>
					5.1 The duration of our contractual relationship is initially
					undetermined. It shall begin when registering at the Platform and upon
					the explicit acceptance of these Terms of Use, and You or Us may elect
					to terminate the Service at any time by providing notice, in
					accordance with these Terms of Use, of thirty (30) days from the
					termination date.
				</p>
				<p>
					In the event of termination, You must pay all outstanding amounts to
					Us in a maximum period of five (5) days from the notification date or
					We will transfer to you any positive balance, whichever is the case.
					Prior to requesting the termination, You must remove the Content from
					the DMSs using the "Takedown" functionality that is available to you
					within the Platform. Moreover, in the event of termination, You
					authorize Us suspend your account, block your access to your account
					and delete all the files and information uploaded by You to the
					Platform. The termination shall not affect the accrued rights and
					obligations of the parties at the date of termination.
				</p>
				<p>
					5.2 Additionally, We may terminate our relationship and the Service:
				</p>
				<ol type="a">
					<li>
						<p>
							in the event You breach any term or condition established by Us
							(here or in any other document accepted by You) and You fail to
							remedy such breach within two (2) days of the date of notice from
							Us;
						</p>
					</li>
					<li>
						<p>
							in case the outstanding balance is not paid as per Section 4.7, We
							will have the right to terminate the relationship and cease the
							Service.
						</p>
					</li>
					<li>
						<p>
							If You become the subject of any proceeding related to your
							liquidation or insolvency (whether voluntary or involuntary) which
							is not dismissed within sixty (60) calendar days;
						</p>
					</li>
					<li>
						<p>If You infringe our Intellectual Property Rights.</p>
					</li>
					<li>
						<p>If You infringe our Anti-Fraud Policy.</p>
					</li>
					<li>
						<p>
							In case you commit any unlawful activity using the Platform or the
							Service.
						</p>
					</li>
				</ol>
				<p>
					5.3 In all cases, all costs due for any Service provided by Us until
					the termination date, must be duly paid by You.
				</p>
				<p>
					5.4 We will not be liable to You for damages of any kind because of
					the termination of our relationship in accordance with these Terms of
					Use. Our respective rights and obligations contained in sections that
					by their nature are intended to survive, will survive the termination
					of this relationship.
				</p>
				<p>
					Regardless the termination of the Service, You and We agree to
					maintain in force those contracts signed by Us with third parties
					before receiving the notification of termination in the event the
					contracts with such third parties would be still in force.
				</p>
				<p>
					<h4>Intellectual Property Rights</h4>
				</p>
				<p>
					6.1 Nothing contained herein shall be construed as granting or
					conferring any property rights in the Platform or any part thereof to
					You; therefore, We are not granting to You by means of this Terms of
					Use, the right to exploit our Intellectual Property (including but not
					limited to copyright, patent, trademarks, registered marks, trade
					secrets, and confidential and proprietary information relating
					thereto). All these rights are expressly reserved by Us and, as a
					consequence, We will retain all licensed or ownership rights to the
					Platform, our brands, technology, etc., together with any complete or
					partial copies thereof.
				</p>
				<p>
					6.2 When You upload any of Your Content to our servers through the
					Platform, you are recognizing the following:
				</p>
				<ol type="a">
					<li>
						<p>
							that We are authorized to administrate, directly or through third
							parties, Your Content (including the recordings, videos,
							compositions, artwork, etc.) through the Digital Music Services
							selected by You, in the entire world and during the duration of
							our relationship (including section 5.4);
						</p>
					</li>
					<li>
						<p>
							that You own and/or control all rights in and to the Your Content
							and/or have the full right and ability to upload Your Content and
							exploit it in the terms described herein;
						</p>
					</li>
					<li>
						<p>
							that Your Content does not infringe the copyrights or any other
							right, of any third party.
						</p>
					</li>
					<li>
						<p>
							that We are authorised during the Duration of the agreement, to
							grant to third parties synchronisation licences of Your Content
							for the entire world.
						</p>
					</li>
				</ol>
				<p>
					6.3 If any of Your Content use any kind of the so-called
					&ldquo;copyleft license&rdquo; and such content was created or
					developed by a person (including artists and producers) which is not
					associated to any Performing Right Organization (such as but not
					limited to SACEM in France, MCPS in UK, SGAE in Spain, GEMA in
					Germany, etc.) in any country of the world, upon the compliance of
					section 4.4 above, then You authorize Us to claim on their behalf,
					where appropriate, to the Performing Right Organization of each
					country, any royalties, levies, duties, etc. that Digital Music
					Services have paid in respect with such content.
				</p>
				<p>
					6.4 You must indicate through the Platform the name of the record
					label (associated with the phonographic producer) for each release or
					phonogram that you intend to distribute in any country in the world
					using the platform (phonographic producer that is associated with any
					Collective Management Society (CMO), as for example SCPP in France,
					PPL in the United Kingdom, AGEDI in Spain, CAPIF in Argentina, etc.).
					In contrast, if any of Your content is distributed using any "Public
					Label Name" available on the platform, you agree, in accordance with
					the provisions of section 4.4 above, with the following:
				</p>
				<ol type="a">
					<li>
						<p>
							You authorize and facilitates the transmission by you to us and
							the acquisition by us from you of the following rights:
							Reproduction Rights, Public Communication Rights, of your contents
							(sound recordings or music videos) distributed using the platform.
						</p>
					</li>
					<li>
						<p>
							You authorize us to claim in your name, as appropriate, to the
							Collective Management Society (CMO) of each country, any rights,
							charges, obligations, etc. that those have collected with respect
							to said content.
						</p>
					</li>
				</ol>
				<p>
					<h4>Fraud</h4>
				</p>
				<p>
					7.1 We work very hard and invest extensive resources to avoid
					automated and fraudulent behaviors. For this reason, we have created a
					specific Anti-Fraud Policy, that is available at the bottom of the
					rewave.ch page. When you accept these Terms of Use, you also
					acknowledge and accept our Anti-Fraud Policy and, therefore, You
					accept that, among other commitments, You will not, and will not
					authorize any third party to, directly or indirectly, generate
					automated, fraudulent, or otherwise invalid playback actions,
					especially in Digital Music Services.
				</p>
				<p>
					7.2 In this Anti-Fraud Policy we have implemented a 3-strike policy;
					therefore, please, read carefully such policy as We will be very
					strict applying it.
				</p>
				<p>
					<h4>Privacy</h4>
				</p>
				<p>
					8.1 Our data protection policy is described in the Privacy Policy. The
					Privacy Policy is part of our relationship and, therefore, when you
					accept these Terms of Use, you are also acknowledging and accepting
					our Privacy Policy, which is available at the bottom section of
					rewave.ch.
				</p>
				<p>
					<h4>Warranty. Limitation of Liability</h4>
				</p>
				<p>
					9.1 We cannot warrant to You that the Platform and the Service will
					meet your requirements. Except as expressly provided in these Terms of
					Use, We provide the Services and the Platform "as is" and without
					warranty. We disclaim all other warranties, express or implied,
					including the implied warranties of non-infringement, merchantability,
					and fitness for a particular purpose. The Platform cannot be tested in
					every possible operating environment, therefore We do not warrant that
					the functions contained in the Platform will meet your requirements,
					that operation of the Platform will be uninterrupted, or that the
					Platform is error free. Except as set forth herein and to the extent
					permitted by law, all other warranties, expressed or implied,
					statutory or otherwise, including, but not limited to, implied
					warranties of merchantability, quality, and fitness for a particular
					purpose are excluded on the part of Us. Neither Us nor any of our
					third-party suppliers or partners shall be liable for any injury, loss
					or damage, whether indirect, special, incidental or consequential nor
					for any lost profits, contracts, loss of data or programs, the cost of
					recovering such data, or incorrect, defective or faulty performance of
					Your Content.
				</p>
				<p>
					9.2 You will assume all liability and defend, indemnify, and hold Us
					and any party, harmless for the use of the Platform and the Service.
				</p>
				<p>
					9.3 Our liability under or in connection with the Platform and the
					Service (including damages) whether arising from negligence, breach of
					contract or otherwise shall be limited to the value of the fees paid
					by You to Us during the 12 months prior to the claim.
				</p>
				<p>
					9.4 We shall not be liable for any loss of, whether arising directly
					or indirectly, (a) profits, (b) savings, (c) goodwill, (d) reputation,
					(e) revenue, (f) anticipated savings, (g) business or opportunity or
					(h) any other like pure economic loss; nor any special, indirect,
					consequential or incidental losses or damages of any kind or nature
					whatsoever regardless of whether in each case arising from breach of
					contract, warranty, tort, strict liability, negligence or otherwise,
					even if advised of the possibility of such loss or damage, or if such
					loss or damage could have been reasonably foreseen.
				</p>
				<p>
					9.5 We respect the rights of others (including copyright, image and
					personality rights, etc.) and expect our clients to do the same. In
					compliance with the European Directive on Liability of Internet
					Service Providers, we will respond expeditiously to remove or disable
					access to material uploaded by users of the Platform and/or the
					Service that is claimed to infringe third parties&rsquo; rights.
				</p>
				<p>
					<h4>Miscellaneous</h4>
				</p>
				<p>
					10.1 Non-assignment: You may not assign your account or any interest
					therein to any third party (including companies of your same group),
					without our express prior written consent.
				</p>
				<p>
					10.2 Severability: If any provision of this Agreement is found invalid
					or unenforceable, that provision will be enforced to the maximum
					extent permissible, and the other provisions of this Agreement will
					remain in force.
				</p>
				<p>
					10.3 Promotion: We are not obliged to effectuate any online promotion
					and/or marketing of Your Content under these Terms of Use. However, We
					may offer complimentary promotional services which You may contract
					separately.
				</p>
				<p>
					10.4 Notifications: Any notice that You or Us need to effectuate in
					connection with the development and performance of these Terms of Use
					shall be, whichever their object, by email at the addresses listed on
					your account on the Platform and, to Us, to any of the following
					means:
				</p>
                <div style={{textAlign:'center',lineHeight:'2em',marginBottom:'10px'}}>
                <p>J.S. Suisse GmbH</p>
				<p>Tobelrainli 10</p>
				<p>5416 Kirchdorf (Switzerland)</p>
				<p>Email: support@rewave.ch</p>
                </div>
				
				<p>
					10.5 Amendments: We may amend this Terms of Use, the Anti-Fraud
					Policy, the Privacy Policy or any other legal document from time to
					time, in which case the new terms will supersede prior versions. We
					will notify You not less than ten (10) days prior to the effective
					date of any such amendment and your continued use of the Service
					and/or the Platform following the effective date of any such amendment
					may be relied upon by Us as your consent to any such amendment. Our
					failure to enforce at any time any provision of these Terms of Use,
					the Anti-Fraud Policy or any other legal document does not constitute
					a waiver of that provision or of any other provision of our terms.
				</p>
				<p>
					10.6 Confidentiality: In the event We provide any kind of information
					to you (including but not limited to statistics of the Platform,
					performance KPIs, marketing material, etc.) You agree to treat such
					information as confidential and in no event shall be utilized (for its
					benefits or for third parties), disclosed, transmitted to third
					parties or made public in any way by You without our prior written
					agreement.
				</p>
				<p>
					10.7 Law and Jurisdiction: This Agreement shall be governed and
					construed in accordance with the laws of Switzerland. When valid by
					law, any dispute, controversy or claim arising under, out of or
					relating to this contract and any subsequent amendments of this
					contract, including, without limitation, its formation, validity,
					binding effect, interpretation, performance, breach or termination, as
					well as non-contractual claims, shall be referred to and finally
					determined by arbitration in accordance with the WIPO Arbitration
					Rules. The arbitral tribunal shall consist of a sole arbitrator. The
					place of arbitration shall be Kirchdorf (Switzerland). The language to
					be used in the arbitral proceedings shall be English. However, if
					local regulations establish any kind of limitation based on the nature
					of the End User, any claims or lawsuits between the parties will be
					resolved by the Courts of the city of Kirchdorf (Switzerland).
				</p>
				<p>
					<br />
					<br />
				</p>
			</TermsOfUseContainer>
		</Body>
	)
}
