import { LanguageMode } from '../../embeddedSupport/languageModes';
import { LanguageModelCache } from '../../embeddedSupport/languageModelCache';
import { VueDocumentRegions } from '../../embeddedSupport/embeddedSupport';
import { TextEdit, TextDocument, Range, FormattingOptions } from 'vscode-languageserver-types';

import { prettierify } from '../../utils/prettier';
import { getFileFsPath } from '../../utils/paths';

import { VLSFormatConfig } from '../../config';

export function getJSONMode(documentRegions: LanguageModelCache<VueDocumentRegions>): LanguageMode {
  let config: any = {};

  return {
    getId: () => 'json',
    configure(c) {
      config = c;
    },
    format(doc: TextDocument, range: Range, formatParams: FormattingOptions): TextEdit[] {
      const defaultFormatter = config.vetur.format.defaultFormatter.json;
      if (defaultFormatter === 'prettier') {
        const code = doc.getText(range);
        const vlsFormatConfig: VLSFormatConfig = config.vetur.format;
        const fileFsPath = getFileFsPath(doc.uri);
        return prettierify(code, fileFsPath, range, vlsFormatConfig, 'json', false);
      }

      return [];
    },
    onDocumentRemoved() {},
    dispose() {}
  };
}
