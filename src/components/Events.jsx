import React, { useState, useEffect, useRef } from "react";
import "./Events.css";

const events = [
	{
		name: "Installation",
		date: "2024-08-15",
		image: "/events/installation.jpg",
		description:
			"Installation is the ceremonial launchpad of our Rotaract year: an event that marks the official handover of responsibilities from the outgoing council to the newly elected team. It’s where the torch of leadership is passed, past milestones are celebrated, and the vision for the upcoming year is unveiled. With meaningful speeches, heartfelt tributes, and a renewed sense of purpose, Installation sets the foundation for everything that follows.",
		aim: 
			"The event exists to honour continuity and change, to appreciate the team that served, and to empower the one that’s about to begin its journey. It reinforces the values of leadership, responsibility, and gratitude, while aligning the club with its yearly theme and goals. / It celebrates the spirit of leadership, honours the efforts of the past, and sets a clear direction for the year ahead in harmony with our theme and vision.",
	},
	{
		name: "Rotaract OnPoint",
		date: "2024-09-10",
		image: "/events/onpoint.jpg",
		description:
			"Rotaract On Point is an intellectually stimulating seminar series that takes the shape of a talk show or podcast, where curiosity meets clarity. By bringing industry experts, innovators, and changemakers onto the panel, we dive deep into conversations that challenge the norm, explore untold truths, and spark thought. These aren’t just talks; they’re tools for transformation that are designed to equip us as engineers, critical thinkers, and evolving individuals in a fast-paced world.",
		aim: "To fuel meaningful dialogue that bridges academics with the real world, sharpens professional perspective, and encourages holistic growth. It’s about asking better questions, not just getting the “right” answers, and becoming more curious, conscious, and connected along the way.",
	},
	{
		name: "FootSlog",
		date: "2024-10-05",
		image: "/events/footslog.jpg",
		description:
			"Footslog is not just a trek.... It’s an experience of togetherness, self-discovery, and unplugged joy. Away from screens, schedules, and city stress, students venture into nature to reconnect with themselves and one another. Whether it’s scaling rocky paths or pushing through the final stretch together, Footslog brings out a spirit of adventure, spontaneity, and carefree fun.",
		aim: "To create a space for casual bonding, shared laughter, and a break from the everyday routine. It encourages stepping outside comfort zones, both physically and socially, and fosters a deep sense of community through shared adventure.",
	},
	{
		name: "Beach Clean Up",
		date: "2024-11-12",
		image: "/events/beachcleanup.jpg",
		description:
			"A social initiative to clean local beaches and spread awareness about environmental conservation.",
		aim: "To make a positive environmental impact and inspire others.",
	},
	{
		name: "Joy Of Giving",
		date: "2024-11-12",
		image: "/events/beachcleanup.jpg",
		description:
			"Joy of Giving is an emotionally rich outreach initiative where we visit the Father Agnel Ashram to spend quality time with the children residing there. Through games, performances, interactive sessions, and meaningful conversations, the event becomes a beautiful exchange of joy, compassion, and humanity, where the giving goes both ways.",
		aim: "To cultivate empathy, break barriers of privilege, and remind members of the simple, powerful impact of presence and kindness. It’s about human connection not charity, but solidarity.",
	},
	{
		name: "Heart and Sole Run",
		date: "2025-01-20",
		image: "/events/heartandsole.jpg",
		description:
			"Heart and Sole is our flagship charity marathon — a vibrant convergence of fitness, philanthropy, and community spirit. It’s a platform where people from all walks of life come together to run for a cause, to contribute to something larger than themselves. With over 1000 participants joining in recent editions, the event blends energy and empathy at scale. Each stride taken fuels not just momentum, but meaningful change.",
		aim: "To amplify awareness and raise funds in support of Father Agnel Ashram, where underprivileged children are provided with education, shelter, healthcare, and holistic care for their well-being. By combining physical movement with a social mission, the run instills a sense of responsibility and shared purpose.",
	},
];

const Events = () => {
	const [activeIdx, setActiveIdx] = useState(0);
	const eventsDetailsRef = useRef(null);

	// Sync About Us scroll with Events horizontal scroll
	useEffect(() => {
		const aboutUs = document.getElementById("aboutus");
		const eventsSection = document.getElementById("events");
		const installationTitle = document.querySelector('.events-details-title');

		const onScroll = () => {
			if (!aboutUs || !eventsDetailsRef.current || !eventsSection || !installationTitle) return;

			const titleRect = installationTitle.getBoundingClientRect();

			// Keep Installation active until its title reaches the top of the viewport
			if (titleRect.top > 0) {
				setActiveIdx(0);
				return;
			}

			// Otherwise, calculate progress through the Events section
			const eventsRect = eventsSection.getBoundingClientRect();
			const eventsHeight = eventsRect.height;
			const scrollY = Math.min(
				eventsHeight,
				Math.max(0, window.innerHeight - eventsRect.top)
			);
			const progress = scrollY / eventsHeight;
			const idx = Math.min(
				events.length - 1,
				1 + Math.floor(progress * (events.length - 1))
			);
			setActiveIdx(idx);
		};

		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return ( <>
					<h2
				className="events-heading"
				style={{
					textAlign: "center",
					fontWeight: "bold",
					fontSize: "2.5rem",
					letterSpacing: "0.08em",
					color: "#d7b64d",
					marginBottom: "2rem",
					marginTop: "0.5rem",
					textTransform: "uppercase",
					display: window.innerWidth > 900 ? "block" : "none"
				}}
			>
				OUR EVENTS
			</h2>
		<section id="events" className="events-section">
			{/* Desktop Title */}

			<div className="events-main-grid">
				{/* Left: Event List */}
				<div className="events-list">
					<div className="events-list-scroll">
						{events.map((event, idx) => (
							<div
								key={event.name}
								className={`events-list-item${
									activeIdx === idx ? " active" : ""
								}`}
								tabIndex={0}
								onMouseEnter={() => setActiveIdx(idx)}
								onClick={() => setActiveIdx(idx)}
								onFocus={() => setActiveIdx(idx)}
							>
								{event.name}
							</div>
						))}
					</div>
				</div>
				{/* Right: Event Details */}
				<div className="events-details" ref={eventsDetailsRef}>
					<div className="events-details-img-wrap">
						<img
							src={events[activeIdx].image}
							alt={events[activeIdx].name}
							className="events-details-img"
						/>
					</div>
					<div className="events-details-content">
						<div className="events-details-info-bento">
							<div className="events-details-title">
								{events[activeIdx].name}
							</div>
							<div className="events-details-date">
								<span>
									{new Date(events[activeIdx].date).toLocaleDateString()}
								</span>
							</div>
							{events[activeIdx].name === "Rotaract OnPoint" && (
								<button className="events-details-episodes-btn">
									View All Episodes
								</button>
							)}
						</div>
						<div className="events-details-bento">
							<div className="events-details-bento-section">
								<div className="events-details-bento-label">Aim</div>
								<div className="events-details-bento-value">
									{events[activeIdx].aim}
								</div>
							</div>
							<div className="events-details-bento-section">
								<div className="events-details-bento-label">
									Description
								</div>
								<div className="events-details-bento-value">
									{events[activeIdx].description}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* Mobile vertical list */}
			<div className="events-mobile-list">
				<div className="events-mobile-title">Our Events</div>
				{events.map((event) => (
					<div className="events-mobile-item" key={event.name}>
						<img
							src={event.image}
							alt={event.name}
							className="events-mobile-img"
						/>
						<div className="events-mobile-item-title">{event.name}</div>
						<div className="events-mobile-item-date">
							{new Date(event.date).toLocaleDateString()}
						</div>
						<div className="events-mobile-item-desc">
							{event.description}
						</div>
						<div className="events-mobile-item-aim">
							<strong>Aim:</strong> {event.aim}
						</div>
						{event.name === "Rotaract OnPoint" && (
							<button className="events-mobile-episodes-btn">
								View All Episodes
							</button>
						)}
					</div>
				))}
			</div>
		</section>
		</>
	);
};

export default Events;