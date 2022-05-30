<script>
	import Navbar from "../components/navigation/Navbar.svelte";
	import "../styles/premium.css";
	
	import data from "../utils/data";
	const plans = data.premium.plans;

	const pricingData = {
		pricing: [
			{
				title: plans.free.name,
				price: plans.free.price,
				description: plans.free.description,
				text: "Already owned"
			},
			{
				title: plans.premium.name,
				price: plans.premium.price,
				description: plans.premium.description,
				active: true,
				text: "Subscribe"
			},
			{
				title: plans.extra.name,
				price: plans.extra.price,
				description: plans.extra.description,
				text: "Coming soon"
			},
		],
		sections: [
			{
				name: "Alerts",
				features: [
					{
						name: "Monthly alerts",
						free: "100",
						premium: "unlimited",
						extra: "unlimited",
					},
					{
						name: "View alert history",
						free: "no", // "int", "unlimited", "yes", "no"
						premium: "yes",
						extra: "yes",
					},
					{
						name: "View public alerts",
						free: "no",
						premium: "yes",
						extra: "yes",
					},
					{
						name: "Send public alerts",
						free: "no",
						premium: "no",
						extra: "yes",
					},
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
					},
					{
						name: "Import/Export",
						free: "no",
						premium: "yes",
						extra: "yes",
					},
				],
			},
			{
				name: "Servers",
				features: [
					{
						name: "Server limit",
						free: "5",
						premium: "unlimited",
						extra: "unlimited",
					},
					{
						name: "Server groups",
						free: "no",
						premium: "yes",
						extra: "yes",
					},
				],
			},
			{
				name: "Bot",
				features: [
					{
						name: "Prices",
						free: "yes",
						premium: "yes",
						extra: "yes",
					},
					{
						name: "Charts",
						free: "no",
						premium: "yes",
						extra: "yes",
					},
					{
						name: "News",
						free: "no",
						premium: "yes",
						extra: "yes",
					},
					{
						name: "Whales",
						free: "no",
						premium: "yes",
						extra: "yes",
					},
					{
						name: "Flow algo",
						free: "no",
						premium: "no",
						extra: "yes",
					},
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
						<span class="feature title">{feature.name ? feature.name : "Feature name"}</span>
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
							href="/"
							class="subscribe {pricing.active && "active"}"
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
									<span><i class='bx bxs-check-circle text-green-400'></i></span>
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