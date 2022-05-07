<script>
	import Navbar from "../components/navigation/Navbar.svelte";
</script>
<div class="flex flex-col items-center">
	<Navbar />
	<span class="text-5xl font-bold my-24">Take your alerting to the next level</span>
	<div class="pricing flex flex-col border border-solid border-gray-700 rounded-md">
		<div class="header rounded-t-md">
			<span>Plans</span>
			<div class="columns">
				<span class="ml-12">Free</span>
				<span class="ml-4">Premium</span>
				<span class="mr-12">Extra</span>
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
					<span class="text-gray-400">For small alerters</span>
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
					<span class="text-gray-400">For large alerters</span>
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
					<span class="text-gray-400">For massive alerters</span>
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
			<span>Monthly alerts</span>
			<div class="columns">
				<span class="ml-12">100</span>
				<span class="ml-4">Unlimited</span>
				<span class="mr-12">Unlimited</span>
			</div>
		</div>
		<div class="feature">
			<span>View alert history</span>
			<div class="columns">
				<span class="ml-12">-</span>
				<span class="ml-4"><i class='bx bxs-check-circle'></i></span>
				<span class="mr-12"><i class='bx bxs-check-circle'></i></span>
			</div>
		</div>
		<div class="feature">
			<span>View public alerts</span>
			<div class="columns">
				<span class="ml-12">-</span>
				<span class="ml-4"><i class='bx bxs-check-circle'></i></span>
				<span class="mr-12"><i class='bx bxs-check-circle'></i></span>
			</div>
		</div>
		<div class="feature">
			<span>Send public alerts</span>
			<div class="columns">
				<span class="ml-12">-</span>
				<span class="ml-4">-</span>
				<span class="mr-12"><i class='bx bxs-check-circle'></i></span>
			</div>
		</div>
		<div class="header">Templates</div>
		<div class="feature">
			<span>Templates</span>
			<div class="columns">
				<span class="ml-12">5</span>
				<span class="ml-4">Unlimited</span>
				<span class="mr-12">Unlimited</span>
			</div>
		</div>
		<div class="feature">
			<span>Import/Export</span>
			<div class="columns">
				<span class="ml-12">-</span>
				<span class="ml-4"><i class='bx bxs-check-circle'></i></span>
				<span class="mr-12"><i class='bx bxs-check-circle'></i></span>
			</div>
		</div>
		<div class="header">Servers</div>
		<div class="feature">
			<span>Servers</span>
			<div class="columns">
				<span class="ml-12">5</span>
				<span class="ml-4">Unlimited</span>
				<span class="mr-12">Unlimited</span>
			</div>
		</div>
		<div class="feature">
			<span>Server groups</span>
			<div class="columns">
				<span class="ml-12">-</span>
				<span class="ml-4">-</span>
				<span class="mr-12"><i class='bx bxs-check-circle'></i></span>
			</div>
		</div>
		<div class="header">Bot</div>
		<div class="feature">
			<span>Prices</span>
			<div class="columns">
				<span class="ml-12"><i class='bx bxs-check-circle'></i></span>
				<span class="ml-4"><i class='bx bxs-check-circle'></i></span>
				<span class="mr-12"><i class='bx bxs-check-circle'></i></span>
			</div>
		</div>
		<div class="feature">
			<span>Charts</span>
			<div class="columns">
				<span class="ml-12">-</span>
				<span class="ml-4"><i class='bx bxs-check-circle'></i></span>
				<span class="mr-12"><i class='bx bxs-check-circle'></i></span>
			</div>
		</div>
		<div class="feature">
			<span>News</span>
			<div class="columns">
				<span class="ml-12">-</span>
				<span class="ml-4"><i class='bx bxs-check-circle'></i></span>
				<span class="mr-12"><i class='bx bxs-check-circle'></i></span>
			</div>
		</div>
		<div class="feature">
			<span>Whales</span>
			<div class="columns">
				<span class="ml-12">-</span>
				<span class="ml-4"><i class='bx bxs-check-circle'></i></span>
				<span class="mr-12"><i class='bx bxs-check-circle'></i></span>
			</div>
		</div>
		<div class="feature">
			<span>Flow algo</span>
			<div class="columns">
				<span class="ml-12">-</span>
				<span class="ml-4">-</span>
				<span class="mr-12"><i class='bx bxs-check-circle'></i></span>
			</div>
		</div>
		<div class="header">Other</div>
		<div class="feature">
			<span>Exclusive discord role</span>
			<div class="columns">
				<span class="ml-12">-</span>
				<span class="ml-4"><i class='bx bxs-check-circle'></i></span>
				<span class="mr-12"><i class='bx bxs-check-circle'></i></span>
			</div>
		</div>
		<div class="feature">
			<span>Priority support</span>
			<div class="columns">
				<span class="ml-12">-</span>
				<span class="ml-4"><i class='bx bxs-check-circle'></i></span>
				<span class="mr-12"><i class='bx bxs-check-circle'></i></span>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
    .pricing {
        width: 1200px;
        min-height: 100px;
    }
    .pricing .header {
        @apply flex flex-row justify-between bg-light-primary p-4;
    }
    .pricing .columns {
        @apply flex flex-row justify-between;
        width: 70%;
    }
    .pricing .section {
        @apply flex flex-row justify-between p-4;
    }
    .pricing .section .columns .pricing-column {
        @apply flex flex-col items-center;
    }
    .pricing .section .columns .pricing-column .price {
        @apply flex flex-row;
    }
    .pricing .section .columns .pricing-column .price .text {
        @apply text-2xl font-bold;
    }
    .pricing .section .columns .pricing-column .price .frequency {
        @apply text-gray-400 ml-1 mt-2;
    }
    .pricing .section .columns .pricing-column .subscribe {
        @apply py-2 px-4 rounded-md mt-2 w-40 text-center;
    }
    .pricing .feature {
        @apply flex flex-row justify-between p-4 border border-solid border-x-0 border-t-0 border-gray-700;
    }
    .pricing .feature .columns span {
        @apply text-gray-400 w-16 text-center;
    }
    .pricing .feature .columns i {
        @apply text-green-400 text-xl;
    }
</style>