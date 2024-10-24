<template>
  <div>
    <ClientOnly>
      <p class="mt-0 mb-2 is-size-7 has-text-weight-semibold is-uppercase has-msft-cool-grey-color">
        Checklist
      </p>
      <ChecklistDropdown />

      <p class="mt-5 mb-2 is-size-7 has-text-weight-semibold is-uppercase has-msft-cool-grey-color">
        Contents
      </p>
      <ChecklistNavigation />
    </ClientOnly>
  </div>
</template>
