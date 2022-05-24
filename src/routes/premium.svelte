<script>
	import Navbar from "../components/navigation/Navbar.svelte";
	// import "../styles/premium.css";
</script>

<Navbar>
	<span class="text-5xl font-bold my-24 text-center md:text-3xl md:my-12">Take your alerting to the next level</span>
	<!-- <div class="pricing flex flex-col border border-solid border-gray-700 rounded-md mb-8 w-12xx lg:w-11/12">
		<div class="header rounded-t-md">
			<span class="text">Plans</span>
			<div class="columns">
				<span class="text ml-12">Free</span>
				<span class="text ml-4">Premium</span>
				<span class="text mr-12">Extra</span>
			</div>
		</div>
		<div class="section my-4">
			<div></div>
			<div class="columns">
				<div class="pricing-column">
					<span class="price">
						<span class="text">$0</span>
						<span class="frequency">/month</span>
					</span>
					<span class="description">For small alerters</span>
					<a
						href="/"
						class="subscribe bg-dark-primary"
					>
						Already owned
					</a>
				</div>
				<div class="pricing-column">
					<span class="price">
						<span class="text">$9.99</span>
						<span class="frequency">/month</span>
					</span>
					<span class="description">For large alerters</span>
					<a
						href="/"
						class="subscribe bg-accent"
					>
						Subscribe
					</a>
				</div>
				<div class="pricing-column">
					<span class="price">
						<span class="text">$19.99</span>
						<span class="frequency">/month</span>
					</span>
					<span class="description">For massive alerters</span>
					<a
						href="/"
						class="subscribe bg-dark-primary"
					>
						Coming soon
					</a>
				</div>
			</div>
		</div>
		<div class="header">Alerts</div>
		<div class="feature">
			<span class="text">Monthly alerts</span>
			<div class="columns">
				<span class="ml-12">100</span>
				<span class="ml-4">Unlimited</span>
				<span class="mr-12">Unlimited</span>
			</div>
		</div>
		<div class="feature">
			<span class="text">View alert history</span>
			<div class="columns">
				<span class="ml-12">-</span>
				<span class="ml-4"><i class='bx bxs-check-circle'></i></span>
				<span class="mr-12"><i class='bx bxs-check-circle'></i></span>
			</div>
		</div>
		<div class="feature">
			<span class="text">View public alerts</span>
			<div class="columns">
				<span class="ml-12">-</span>
				<span class="ml-4"><i class='bx bxs-check-circle'></i></span>
				<span class="mr-12"><i class='bx bxs-check-circle'></i></span>
			</div>
		</div>
		<div class="feature">
			<span class="text">Send public alerts</span>
			<div class="columns">
				<span class="ml-12">-</span>
				<span class="ml-4">-</span>
				<span class="mr-12"><i class='bx bxs-check-circle'></i></span>
			</div>
		</div>
		<div class="header">Templates</div>
		<div class="feature">
			<span class="text">Templates</span>
			<div class="columns">
				<span class="ml-12">5</span>
				<span class="ml-4">Unlimited</span>
				<span class="mr-12">Unlimited</span>
			</div>
		</div>
		<div class="feature">
			<span class="text">Import/Export</span>
			<div class="columns">
				<span class="ml-12">-</span>
				<span class="ml-4"><i class='bx bxs-check-circle'></i></span>
				<span class="mr-12"><i class='bx bxs-check-circle'></i></span>
			</div>
		</div>
		<div class="header">Servers</div>
		<div class="feature">
			<span class="text">Servers</span>
			<div class="columns">
				<span class="ml-12">5</span>
				<span class="ml-4">Unlimited</span>
				<span class="mr-12">Unlimited</span>
			</div>
		</div>
		<div class="feature">
			<span class="text">Server groups</span>
			<div class="columns">
				<span class="ml-12">-</span>
				<span class="ml-4">-</span>
				<span class="mr-12"><i class='bx bxs-check-circle'></i></span>
			</div>
		</div>
		<div class="header">Bot</div>
		<div class="feature">
			<span class="text">Prices</span>
			<div class="columns">
				<span class="ml-12"><i class='bx bxs-check-circle'></i></span>
				<span class="ml-4"><i class='bx bxs-check-circle'></i></span>
				<span class="mr-12"><i class='bx bxs-check-circle'></i></span>
			</div>
		</div>
		<div class="feature">
			<span class="text">Charts</span>
			<div class="columns">
				<span class="ml-12">-</span>
				<span class="ml-4"><i class='bx bxs-check-circle'></i></span>
				<span class="mr-12"><i class='bx bxs-check-circle'></i></span>
			</div>
		</div>
		<div class="feature">
			<span class="text">News</span>
			<div class="columns">
				<span class="ml-12">-</span>
				<span class="ml-4"><i class='bx bxs-check-circle'></i></span>
				<span class="mr-12"><i class='bx bxs-check-circle'></i></span>
			</div>
		</div>
		<div class="feature">
			<span class="text">Whales</span>
			<div class="columns">
				<span class="ml-12">-</span>
				<span class="ml-4"><i class='bx bxs-check-circle'></i></span>
				<span class="mr-12"><i class='bx bxs-check-circle'></i></span>
			</div>
		</div>
		<div class="feature">
			<span class="text">Flow algo</span>
			<div class="columns">
				<span class="ml-12">-</span>
				<span class="ml-4">-</span>
				<span class="mr-12"><i class='bx bxs-check-circle'></i></span>
			</div>
		</div>
		<div class="header">Other</div>
		<div class="feature">
			<span class="text">Exclusive discord role</span>
			<div class="columns">
				<span class="ml-12">-</span>
				<span class="ml-4"><i class='bx bxs-check-circle'></i></span>
				<span class="mr-12"><i class='bx bxs-check-circle'></i></span>
			</div>
		</div>
		<div class="feature">
			<span class="text">Priority support</span>
			<div class="columns">
				<span class="ml-12">-</span>
				<span class="ml-4"><i class='bx bxs-check-circle'></i></span>
				<span class="mr-12"><i class='bx bxs-check-circle'></i></span>
			</div>
		</div>
	</div> -->
	<div class="flex flex-row">
		<div class="column left">
			<span class="header">Plans</span>
			<div class="empty">Some text</div>
			<span class="header">Alerts</span>
		</div>
		<div class="column features">
			<span class="header">Free</span>
			<div class="empty">Some text</div>
			<span class="empty-header">a</span>
		</div>
		<div class="column features">
			<span class="header">Premium</span>
			<div class="empty">Some text</div>
			<span class="empty-header">a</span>
		</div>
		<div class="column right features">
			<span class="header">Extra</span>
			<div class="empty">Some text</div>
			<span class="empty-header">a</span>
		</div>
	</div>
</Navbar>

<style lang="postcss">
	.column {
		@apply flex flex-col border-x-0 border-y border-solid border-gray-700;
	}
	.column.left {
		@apply border-l border-y border-r-0 rounded-l-sm;
	}
	.column.right {
		@apply border-r border-y border-l-0 rounded-r-sm;
	}
	.column .header{
		@apply bg-light-primary p-4;
	}
	.column.features .header {
		@apply px-16;
	}
	.column .empty-header {
		@apply w-full bg-light-primary py-4 text-transparent;
	}
	.column .empty {
		@apply text-transparent py-16;
	}
</style>