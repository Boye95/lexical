/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */
import type {
  DOMConversionMap,
  DOMConversionOutput,
  EditorConfig,
  LexicalNode,
  NodeKey,
  RangeSelection,
  LexicalCommand,
  LexicalEditor,
} from 'lexical';
import {ElementNode} from 'lexical';
import {AppState} from '@excalidraw/excalidraw/types/types';
import {
  ExcalidrawElement,
  NonDeleted,
} from '@excalidraw/excalidraw/types/element/types';

export declare class ExcalidrawNode extends ElementNode {
  __data: string;
  static getType(): string;
  static clone(node: ExcalidrawNode): ExcalidrawNode;
  constructor(data: string, key?: NodeKey);
  createDOM(config: EditorConfig): HTMLElement;
  updateDOM(
    prevNode: ExcalidrawNode,
    dom: HTMLElement,
    config: EditorConfig,
  ): boolean;
  static importDOM(): DOMConversionMap | null;
  getData(): string;
  setData(data: string): void;
  insertNewAfter(selection: RangeSelection): null | ElementNode;
  canInsertTextBefore(): false;
  canInsertTextAfter(): boolean;
  canBeEmpty(): false;
  isInline(): true;
}

export type Modal = ({
  onClose,
  children,
  title,
  closeOnClickOutside,
}: {
  children: JSX.Element | string | (JSX.Element | string)[];
  closeOnClickOutside?: boolean;
  onClose: () => void;
  title: string;
}) => JSX.Element;

export type Excalidraw = ({
  onChange,
  initialData,
}: {
  onChange: (els: ReadonlyArray<ExcalidrawElementFragment>) => void;
  initialData: {
    appState: {isLoading: boolean};
    elements: ReadonlyArray<ExcalidrawElementFragment>;
  };
}) => JSX.Element;

type ImageType = 'svg' | 'canvas';

type ExcalidrawImageProps = {
  /**
   * Configures the export setting for SVG/Canvas
   */
  appState?: Partial<Omit<AppState, 'offsetTop' | 'offsetLeft'>> | null;
  /**
   * The css class applied to image to be rendered
   */
  className?: string;
  /**
   * The Excalidraw elements to be rendered as an image
   */
  elements: NonDeleted<ExcalidrawElement>[];
  /**
   * The height of the image to be rendered
   */
  height?: number | null;
  /**
   * The type of image to be rendered
   */
  imageType?: ImageType;
  /**
   * The css class applied to the root element of this component
   */
  rootClassName?: string | null;
  /**
   * The width of the image to be rendered
   */
  width?: number | null;

  buttonRef: {current: null | HTMLButtonElement};
  isSelected: boolean;
  isResizing: boolean;
  onResizeStart: () => void;
  onResizeEnd: () => void;
  editor: LexicalEditor;
};

export type ExcalidrawImage = (props: ExcalidrawImageProps) => JSX.Element;

export function $createExcalidrawNode(
  excalidrawComponent: Excalidraw,
  excalidrawImage: ExcalidrawImage,
  modalComponent: Modal,
): ExcalidrawNode;
export function $isExcalidrawNode(
  node: ExcalidrawNode | LexicalNode | null | undefined,
): node is ExcalidrawNode;

export type ExcalidrawElementFragment = {
  isDeleted?: boolean;
};

export const INSERT_EXCALIDRAW_COMMAND: LexicalCommand<void>;