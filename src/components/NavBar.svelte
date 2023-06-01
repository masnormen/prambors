<script lang="ts">
	type Menu = {
		text: string;
		href: string;
	};

	export let menus: Menu[];
</script>

<nav class="z-50 w-full p-8 md:fixed">
	<div
		class="relative flex w-full flex-col items-center gap-3 rounded-2xl bg-white px-4 md:h-16 md:flex-row md:gap-6 md:border-2 md:border-gray-500"
	>
		<a href="/">
			<img src="/logo.webp" class="h-10 text-[0]" alt="" />
		</a>

		<div
			class="md:align-x-absolute flex flex-col gap-3 text-center md:absolute md:flex-row md:gap-6"
		>
			{#each menus as menu, index (menu.href)}
				<a
					href={menu.href}
					target="_blank"
					rel="noopener noreferrer"
					class="font-space text-[17px] font-bold transition duration-300 hover:text-amber-800"
				>
					{menu.text}
				</a>
				{#if index !== menus.length - 1}
					<span class="hidden font-semibold text-gray-400 md:inline">/</span>
				{/if}
			{/each}
		</div>
	</div>
</nav>
