"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashFiles = void 0;
const crypto = __importStar(require("crypto"));
const core = __importStar(require("@actions/core"));
const fs = __importStar(require("fs"));
const stream = __importStar(require("stream"));
const util = __importStar(require("util"));
const path = __importStar(require("path"));
function hashFiles(globber, verbose = false) {
    var _a, e_1, _b, _c;
    var _d;
    return __awaiter(this, void 0, void 0, function* () {
        const writeDelegate = verbose ? core.info : core.debug;
        let hasMatch = false;
        const githubWorkspace = (_d = process.env['GITHUB_WORKSPACE']) !== null && _d !== void 0 ? _d : process.cwd();
        const result = crypto.createHash('sha256');
        let count = 0;
        try {
            for (var _e = true, _f = __asyncValues(globber.globGenerator()), _g; _g = yield _f.next(), _a = _g.done, !_a;) {
                _c = _g.value;
                _e = false;
                try {
                    const file = _c;
                    writeDelegate(file);
                    if (!file.startsWith(`${githubWorkspace}${path.sep}`)) {
                        writeDelegate(`Ignore '${file}' since it is not under GITHUB_WORKSPACE.`);
                        continue;
                    }
                    if (fs.statSync(file).isDirectory()) {
                        writeDelegate(`Skip directory '${file}'.`);
                        continue;
                    }
                    const hash = crypto.createHash('sha256');
                    const pipeline = util.promisify(stream.pipeline);
                    yield pipeline(fs.createReadStream(file), hash);
                    result.write(hash.digest());
                    count++;
                    if (!hasMatch) {
                        hasMatch = true;
                    }
                }
                finally {
                    _e = true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_e && !_a && (_b = _f.return)) yield _b.call(_f);
            }
            finally { if (e_1) throw e_1.error; }
        }
        result.end();
        if (hasMatch) {
            writeDelegate(`Found ${count} files to hash.`);
            return result.digest('hex');
        }
        else {
            writeDelegate(`No matches found for glob`);
            return '';
        }
    });
}
exports.hashFiles = hashFiles;
//# sourceMappingURL=internal-hash-files.js.map