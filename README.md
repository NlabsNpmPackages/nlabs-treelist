
# nlabs-treelist

A powerful, customizable TreeList component for Angular with theme support, dynamic loading, and flexible configurations.

## Features

- ✨ **Theme Support**: Built-in Light/Dark/System theme switcher
- 🎨 **Customizable**: Highly configurable with multiple input options and field mapping
- 🔄 **Dynamic Loading**: Lazy load children nodes on demand with `loadChildrenFn`
- 📦 **Standalone Component**: No module imports required (Angular 16+ standalone)
- 🎯 **TypeScript**: Full TypeScript support
- 🌳 **Hierarchical Data**: Display tree structures with ease
- ⚡ **Auto-expand & Auto-select**: Optional automatic behaviors
- 🎭 **Multiple Name Click Actions**: Configure what happens when clicking node names

## Installation

```bash
npm install nlabs-treelist
```

> **Note**: This package requires Angular 20.3.0 or higher. Make sure your project meets this requirement before installing.

## Usage

### Basic Example

```typescript
import { Component } from '@angular/core';
import { NlabsTreeListComponent, TreeNode } from 'nlabs-treelist';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [NlabsTreeListComponent],
	template: `
		<nlabs-tree-list
			[nodes]="treeData"
			[theme]="'light'"
			(selectedIdsChange)="onSelectionChange($event)"
		></nlabs-tree-list>
	`
})
export class AppComponent {
	treeData: TreeNode[] = [
		{
			id: '1',
			name: 'Root Node',
			children: [
				{ id: '1-1', name: 'Child 1', parentId: '1', children: [] },
				{ id: '1-2', name: 'Child 2', parentId: '1', children: [] }
			]
		}
	];

	onSelectionChange(selectedIds: string[]) {
		console.log('Selected IDs:', selectedIds);
	}
}
```

### Dynamic Loading Example

```typescript
<nlabs-tree-list
	[nodes]="treeData"
	[loadChildrenFn]="loadChildren"
></nlabs-tree-list>
```

```typescript
loadChildren = (parentId: string) => {
	// Return a Promise that resolves to an array of TreeNode
	return this.myService.getChildren(parentId).toPromise();
};
```

## API Reference

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `nodes` | `TreeNode[]` | `[]` | The tree data to display |
| `idField` | `string` | `'id'` | Field name for node id (for custom models) |
| `parentIdField` | `string` | `'parentId'` | Field name for parent id |
| `nameField` | `string` | `'name'` | Field name for node label |
| `childrenField` | `string` | `'children'` | Field name for children array |
| `theme` | `'light' \| 'dark'` | `'light'` | Theme when `showThemeSwitcher` is false |
| `showThemeSwitcher` | `boolean` | `false` | Show theme switcher UI (Light/Dark/System) |
| `expandOnSelect` | `boolean` | `false` | Auto-expand node when checkbox is selected |
| `selectChildren` | `boolean` | `false` | Auto-select all children when parent is selected |
| `nameClickAction` | `'toggle' \| 'select' \| 'both'` | `'toggle'` | Action when clicking node name |
| `loadChildrenFn` | `(nodeId: string) => Promise<TreeNode[]>` | `undefined` | Function to load children dynamically |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `selectedIdsChange` | `EventEmitter<string[]>` | Emits selected node IDs |
| `themeChange` | `EventEmitter<'light' \| 'dark'>` | Emits when theme changes |
| `nodeExpanded` | `EventEmitter<TreeNode>` | Emits when node is expanded |
| `nodeCollapsed` | `EventEmitter<TreeNode>` | Emits when node is collapsed |

## Advanced Features

### Custom Field Mapping

You can use custom field names if your data model doesn't match the default TreeNode interface:

```typescript
// If your data looks like this:
interface MyCustomNode {
  customId: string;
  label: string;
  parent: string;
  items: MyCustomNode[];
}

// Configure the component like this:
<nlabs-tree-list
  [nodes]="myCustomData"
  [idField]="'customId'"
  [nameField]="'label'"
  [parentIdField]="'parent'"
  [childrenField]="'items'"
></nlabs-tree-list>
```

### Theme Switcher

Enable the built-in theme switcher to allow users to choose between Light, Dark, or System themes:

```typescript
<nlabs-tree-list
  [nodes]="treeData"
  [showThemeSwitcher]="true"
  (themeChange)="onThemeChange($event)"
></nlabs-tree-list>
```

### Auto-behaviors

Configure automatic selection and expansion behaviors:

```typescript
// Auto-expand nodes when their checkbox is selected
<nlabs-tree-list
  [nodes]="treeData"
  [expandOnSelect]="true"
></nlabs-tree-list>

// Auto-select all children when parent is selected
<nlabs-tree-list
  [nodes]="treeData"
  [selectChildren]="true"
></nlabs-tree-list>
```

### Name Click Actions

Configure what happens when users click on node names:

```typescript
// 'toggle': Expand/collapse the node (default)
// 'select': Select/deselect the node
// 'both': Both toggle and select
<nlabs-tree-list
  [nodes]="treeData"
  [nameClickAction]="'both'"
></nlabs-tree-list>
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Repository

https://github.com/NlabsNpmPackages/nlabs-treelist

## License

MIT
