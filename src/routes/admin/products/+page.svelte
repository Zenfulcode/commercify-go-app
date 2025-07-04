<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Badge } from '$lib/components/ui/badge';
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$lib/components/ui/table';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuTrigger
	} from '$lib/components/ui/dropdown-menu';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Package, Plus, Search, MoreHorizontal, Edit, Trash2, Eye } from 'lucide-svelte';
	import { formatCurrency, getStockStatus } from '$lib';
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import { toast } from 'svelte-sonner';

	let { data } = $props();
	let searchQuery = $state('');
	let productToDelete: { id: number; name: string } | null = $state(null);
	let isDeleting = $state(false);

	function openDeleteDialog(product: { id: number; name: string }) {
		productToDelete = product;
	}

	function closeDeleteDialog() {
		productToDelete = null;
	}
</script>

<div class="space-y-6">
	<!-- Header -->
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-3xl font-bold tracking-tight">Products</h1>
			<p class="text-muted-foreground">Manage your product catalog</p>
		</div>
		<div class="flex items-center gap-3">
			<Button href="/admin/products/categories" variant="outline">Categories</Button>
			<Button href="/admin/products/new" class="flex items-center gap-2">
				<Plus class="h-4 w-4" />
				Add Product
			</Button>
		</div>
	</div>

	<!-- Search and Filters -->
	<Card>
		<CardHeader>
			<CardTitle class="flex items-center gap-2">
				<Package class="h-5 w-5" />
				Product Catalog
			</CardTitle>
			<CardDescription>
				{data.pagination.totalItems} products in your store
			</CardDescription>
		</CardHeader>
		<CardContent>
			<div class="flex items-center space-x-2 mb-4">
				<div class="relative flex-1">
					<Search class="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input bind:value={searchQuery} placeholder="Search products..." class="pl-8" />
				</div>
			</div>

			<!-- Products Table -->
			<div class="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Product</TableHead>
							<TableHead>SKU</TableHead>
							<TableHead>Price</TableHead>
							<TableHead>Stock</TableHead>
							<TableHead>Status</TableHead>
							<TableHead class="text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{#each data.products as product}
							{@const stockStatus = getStockStatus(product.stock)}
							<TableRow>
								<TableCell class="font-medium">
									<div class="flex items-center gap-3">
										{#if product.images}
											<img
												src={product.images[0]}
												alt={product.name}
												class="h-10 w-10 rounded-md object-cover"
											/>
										{:else}
											<div class="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
												<Package class="h-4 w-4 text-muted-foreground" />
											</div>
										{/if}
										<div>
											<div class="font-medium">{product.name}</div>
											{#if product.description}
												<div class="text-sm text-muted-foreground truncate max-w-xs">
													{product.description}
												</div>
											{/if}
										</div>
									</div>
								</TableCell>
								<TableCell>
									{product.sku || 'N/A'}
								</TableCell>
								<TableCell>
									{formatCurrency(product.price)}
									<!-- {#if product.compare_price && product.compare_price > product.price.amount}
										<p class="text-xs text-muted-foreground line-through">
											{formatPrice(product.compare_price, product.price.currency)}
										</p>
									{/if} -->
								</TableCell>
								<TableCell>
									{product.stock}
								</TableCell>
								<TableCell>
									<Badge class={stockStatus.class}>
										{stockStatus.label}
									</Badge>
								</TableCell>
								<TableCell class="text-right">
									<DropdownMenu>
										<DropdownMenuTrigger>
											<Button variant="ghost" class="h-8 w-8 p-0">
												<MoreHorizontal class="h-4 w-4" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuItem>
												<a
													href="/admin/products/{product.id}"
													class="flex items-center gap-2 w-full"
												>
													<Eye class="h-4 w-4" />
													View
												</a>
											</DropdownMenuItem>
											<DropdownMenuItem>
												<a
													href="/admin/products/{product.id}/edit"
													class="flex items-center gap-2 w-full"
												>
													<Edit class="h-4 w-4" />
													Edit
												</a>
											</DropdownMenuItem>
											<DropdownMenuItem class="text-destructive">
												<button
													type="button"
													class="flex items-center gap-2 w-full"
													onclick={() => openDeleteDialog({ id: product.id, name: product.name })}
												>
													<Trash2 class="h-4 w-4" />
													Delete
												</button>
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						{:else}
							<TableRow>
								<TableCell colspan={6} class="text-center py-8">
									<div class="flex flex-col items-center gap-2">
										<Package class="h-8 w-8 text-muted-foreground" />
										<p class="text-muted-foreground">
											{searchQuery
												? 'No products found matching your search.'
												: 'No products found. Create your first product to get started.'}
										</p>
										{#if !searchQuery}
											<Button href="/admin/products/new" size="sm">
												<Plus class="h-4 w-4 mr-2" />
												Add Product
											</Button>
										{/if}
									</div>
								</TableCell>
							</TableRow>
						{/each}
					</TableBody>
				</Table>
			</div>

			<!-- Pagination -->
			{#if data.pagination.totalPages > 1}
				<div class="flex items-center justify-between mt-4">
					<p class="text-sm text-muted-foreground">
						Showing {data.pagination.currentPage} of {data.pagination.totalPages} pages
					</p>
					<div class="flex items-center gap-2">
						<Button variant="outline" size="sm" disabled={data.pagination.currentPage === 1}>
							Previous
						</Button>
						<Button
							variant="outline"
							size="sm"
							disabled={data.pagination.currentPage === data.pagination.totalPages}
						>
							Next
						</Button>
					</div>
				</div>
			{/if}
		</CardContent>
	</Card>
</div>

<!-- Delete Confirmation Dialog -->
<AlertDialog.Root open={productToDelete !== null}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Delete Product</AlertDialog.Title>
			<AlertDialog.Description>
				Are you sure you want to delete "{productToDelete?.name}"? This action cannot be undone and will permanently remove the product from your catalog.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel onclick={closeDeleteDialog}>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action 
				class="bg-destructive text-destructive-foreground hover:bg-destructive/90"
				disabled={isDeleting}
			>
				<form 
					method="POST" 
					action="?/delete"
					use:enhance={() => {
						isDeleting = true;
						return async ({ result }) => {
							isDeleting = false;
							if (result.type === 'success') {
								toast.success('Product deleted successfully');
								closeDeleteDialog();
								// Invalidate the products dependency to refresh data
								invalidate('products');
							} else if (result.type === 'failure') {
								toast.error((result.data as any)?.error || 'Failed to delete product');
							}
						};
					}}
				>
					<input type="hidden" name="productId" value={productToDelete?.id.toString()} />
					<button type="submit" disabled={isDeleting} class="w-full">
						{isDeleting ? 'Deleting...' : 'Delete Product'}
					</button>
				</form>
			</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
