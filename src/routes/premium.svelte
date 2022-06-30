<script>
	import Info from "../components/Info.svelte";
	import Navbar from "../components/navigation/Navbar.svelte";
	import "../styles/premium.css";
import constants from "../utils/constants";
	
	import data from "../utils/data";
	const plans = data.premium.plans;

	const pricingData = {
		pricing: [
			{
				title: plans.free.name,
				price: plans.free.price,
				description: plans.free.description,
				text: "Already owned",
			},
			{
				title: plans.premium.name,
				price: plans.premium.price,
				description: plans.premium.description,
				active: true,
				text: "Subscribe",
			},
			{
				title: plans.extra.name,
				price: plans.extra.price,
				description: plans.extra.description,
				text: "Coming soon",
			},
		],
		sections: [
			{
				name: "Alerts",
				features: [
					{
						name: "Monthly alerts",
						// "int", "unlimited", "yes", "no"
						free: "100",
						premium: "unlimited",
						extra: "unlimited",
						description: "How many alerts you can send per month",
					},
					{
						name: "View alert history",
						free: "no",
						premium: "yes",
						extra: "yes",
						description: "Whether or not you can view your alert history",
					},
					// {
					// 	name: "View public alerts",
					// 	free: "no",
					// 	premium: "yes",
					// 	extra: "yes",
					// },
					// {
					// 	name: "Send public alerts",
					// 	free: "no",
					// 	premium: "no",
					// 	extra: "yes",
					// },
				],
			},
			{
				name: "Templates",
				features: [
					{
						name: "Template limit",
						free: "5",
						premium: "unlimited",
						extra: "unlimited",
						description: "How many templates you can have at a time",
					},
					{
						name: "Import/Export",
						free: "no",
						premium: "yes",
						extra: "yes",
						description: "Whether or not you can import and export templates",
					},
				],
			},
			{
				name: "Servers",
				features: [
					{
						name: "Multiple servers",
						free: "yes",
						premium: "yes",
						extra: "yes",
						description: "Whether or not you can alert to multiple servers at once",
					},
					{
						name: "Server limit",
						free: "5",
						premium: "100",
						extra: "unlimited",
						description: "How many servers you can alert to at once",
					},
					// {
					// 	name: "Server groups",
					// 	free: "no",
					// 	premium: "yes",
					// 	extra: "yes",
					// },
				],
			},
			{
				name: "Bot",
				features: [
					{
						name: "Send alerts",
						free: "yes",
						premium: "yes",
						extra: "yes",
						description: "Whether or not you can send alerts with the bot",
					},
					{
						name: "Prices",
						free: "yes",
						premium: "yes",
						extra: "yes",
						description: "View prices of different tickers",
					},
					{
						name: "Charts",
						free: "no",
						premium: "yes",
						extra: "yes",
						description: "View charts for different tickers",
					},
					{
						name: "News",
						free: "no",
						premium: "yes",
						extra: "yes",
						description: "Get live news to a channel in your server",
					},
					{
						name: "Whales",
						free: "no",
						premium: "yes",
						extra: "yes",
						description: "Get live whale alerts to a channel in your server",
					},
					// {
					// 	name: "Flow algo",
					// 	free: "no",
					// 	premium: "no",
					// 	extra: "yes",
					// 	description: "No description yet",
					// },
				],
			},
			{
				name: "Other",
				features: [
					{
						name: "Exclusive discord role",
						free: "no",
						premium: "yes",
						extra: "yes",
					},
					{
						name: "Priority support",
						free: "no",
						premium: "yes",
						extra: "yes",
					},
				],
			},
		],
	};

	// only premium link should be active (extra and free should be disabled)
</script>

<Navbar scroll>
	<div class="flex flex-col items-center w-full 2xs:items-start">
		<span class="text-5xl font-bold my-24 text-center md:text-3xl md:my-12 2xs:text-xl 2xs:my-6  2xs:whitespace-nowrap 2xs:overflow-hidden 2xs:ml-8">Take your alerting to the next level</span>
		<div class="flex flex-row mb-8 border border-solid border-gray-700 rounded-md 2xs:ml-8">
			<div class="column w-64 sm:w-32">
				<span class="header">Plans</span>
				<div class="empty" />
				{#each pricingData.sections as section}
					<span class="header">{section.name}</span>
					{#each section.features as feature}
						<span class="feature title h-14 flex flex-row">
							<Info
								text={feature.description || "No description yet"}
								right
							/> {feature.name ? feature.name : "Feature name"}
							</span>
					{/each}
				{/each}
			</div>
			{#each pricingData.pricing as pricing}
				<div class="column features">
					<span class="header">{pricing.title}</span>
					<div class="pricing">
						<span class="price">
							<span class="text">${pricing.price}</span>
							<span class="interval">/month</span>
						</span>
						<span class="description">{pricing.description}</span>
						<a
							href={`${constants.api.url}/subscription/checkout?level=${pricing.title.toLowerCase()}`}
							class="subscribe {pricing.active && "active"} {pricing.title.toLowerCase() === "premium" ? "" : "pointer-events-none"}"
						>
							{pricing.text}
						</a>
					</div>
					{#each pricingData.sections as section}
						<span class="empty-header">x</span>
						{#each section.features as sectionFeature}
							{@const featureText = sectionFeature[pricing?.title.toLowerCase()]}
							<span class="feature text">
								{#if featureText === "no"}
									-
								{:else if featureText === "yes"}
									<span>
										<img
											src="/icons/green-check-circle.svg"
											alt="check"
											class="h-6 md:h-4"
										/>
									</span>
								{:else if featureText === "unlimited"}
									Unlimited
								{:else}
									{featureText ? featureText : "?"}
								{/if}
							</span>
						{/each}
					{/each}
				</div>
			{/each}
		</div>
	</div>
</Navbar>